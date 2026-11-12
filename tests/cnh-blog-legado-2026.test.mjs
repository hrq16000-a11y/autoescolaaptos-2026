import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../src/data/blogData.ts", import.meta.url), "utf8");
const page = readFileSync(new URL("../src/pages/BlogPost.tsx", import.meta.url), "utf8");
const app = readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");

function article(slug) {
  const start = src.indexOf('slug: "' + slug + '"');
  assert.notEqual(start, -1, "Missing article: " + slug);
  const next = src.indexOf("\n  },", start);
  const end = next === -1 ? src.indexOf("\n  }\n];", start) : next;
  assert.ok(end > start, "Missing article ending: " + slug);
  return src.slice(start, end);
}

test("URLs e publicação originais preservados em três artigos", () => {
  for (const slug of [
    "como-passar-prova-teorica-detran",
    "como-passar-prova-pratica-detran",
    "renovacao-cnh-como-funciona",
  ]) {
    const a = article(slug);
    assert.match(a, /updatedAt: "2026-11-12"/);
    assert.match(a, /publishedAt: "2024-/);
    assert.match(a, /detran\.pr\.gov\.br/);
  }
  assert.match(page, /"dateModified": post.updatedAt \?\? post.publishedAt/);
  assert.match(page, /Atualizado em/);
});

test("Prova teórica: regra atual, sem promessa de aprovação ou simulador ativo", () => {
  const a = article("como-passar-prova-teorica-detran");
  assert.match(a, /30 questões/);
  assert.match(a, /60 minutos/);
  assert.match(a, /20 acertos/);
  assert.match(a, /simulador próprio da APTOS foi descontinuado/);
  assert.doesNotMatch(a, /21 \(70%\)|simulados exclusivos|a aprovação é garantida/i);
});

test("Prova prática: baliza e rampa retiradas, sem 3 tentativas", () => {
  const a = article("como-passar-prova-pratica-detran");
  assert.match(a, /retirada da baliza/);
  assert.match(a, /retirada da \*\*rampa\*\*/);
  assert.doesNotMatch(a, /Você tem 3 tentativas|### Na Baliza|Aulas no mesmo percurso da prova/);
});

test("Renovação: exceção 2026 e sem valores de 2024 ou reteste teórico obrigatório", () => {
  const a = article("renovacao-cnh-como-funciona");
  assert.match(a, /9 de dezembro de 2026/);
  assert.match(a, /RNPC/);
  assert.match(a, /não presuma que é obrigatório refazer/);
  assert.doesNotMatch(a, /Valores Aproximados \(2024\)|R\$ 120 - R\$ 180|até 5 dias úteis|É necessário refazer os exames teórico e prático/);
});

test("Simulado próprio não é mais uma página pública de questões", () => {
  assert.match(app, /path="\/simulado-detran-pr" element=\{<Navigate to="\/formas-estudo-teorico"/);
  assert.doesNotMatch(src, /Acesso a simulados exclusivos|a aprovação é garantida/i);
});
