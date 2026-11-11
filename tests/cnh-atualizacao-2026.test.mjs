import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = (p) => readFileSync(path.join(root, p), "utf8");

test("simulado desativado no React, TanStack, prefetch, sitemap e roteamento Vercel", () => {
  assert.equal(existsSync(path.join(root, "src/pages/SimuladoDetranPr.tsx")), false);
  assert.equal(existsSync(path.join(root, "src/data/simuladoQuestions.ts")), false);
  assert.match(file("src/App.tsx"), /path="\/simulado-detran-pr" element=\{<Navigate to="\/formas-estudo-teorico"/);
  assert.doesNotMatch(file("src/lib/prefetch.ts"), /SimuladoDetranPr/);
  assert.doesNotMatch(file("public/sitemap.xml"), /<loc>https:\/\/autoescolaaptos\.com\.br\/simulado-detran-pr<\/loc>/);
  assert.match(file("migration/tanstack/src/routes/simulado-detran-pr.tsx"), /redirect\(\{ to: '\/formas-estudo-teorico'/);
  const v = JSON.parse(file("vercel.json"));
  assert.ok(v.redirects.some((r) => r.source === "/simulado-detran-pr" && r.permanent === true));
});
test("FAQ não repete carga horária, PPD, taxa ou exames revogados", () => {
  const faq = file("src/data/faqData.ts");
  assert.match(faq, /PPD\) vale 1 ano/);
  assert.match(faq, /45 horas-aula/);
  assert.match(faq, /01\/06\/2026/);
  assert.match(faq, /R\$ 180/);
  assert.doesNotMatch(faq, /R\$ ?404/);
  assert.doesNotMatch(faq, /PPD.*vale 2 anos/);
  assert.doesNotMatch(faq, /no nosso simulador|nosso simulador/);
});
test("exames e serviços não anunciam prova teórica ou reciclagem obsoletas", () => {
  const exames = file("src/pages/ExamesDetran.tsx");
  assert.match(exames, /20 acertos em 30 questões/);
  assert.doesNotMatch(exames, /21 acertos|prazo de validade de 12 meses/);
  const services = file("src/data/servicosData.ts");
  assert.match(services, /45 horas-aula/);
  assert.doesNotMatch(services, /30 horas\/aula|30 horas de conteúdo|30 horas exigidas/);
  assert.doesNotMatch(file("src/pages/CalculadoraCnh.tsx"), /Simulador de Jornada CNH/);
});
