import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Blog oculto dos menus desktop, mobile e rodapé, mantendo conteúdo e URLs", () => {
  const nav = read("src/components/Navbar.tsx");
  const footer = read("src/components/Footer.tsx");
  const app = read("src/App.tsx");
  assert.doesNotMatch(nav, /href:\s*"\/blog"/);
  assert.doesNotMatch(footer, /to="\/blog"/);
  assert.match(app, /path="\/blog"/);
  assert.match(app, /path="\/blog\/:slug"/);
});

test("Prazo único, sem prometer médias ou 'processo turbinado' nos FAQs", () => {
  const guidance = read("src/data/cnhGuidance.ts");
  const files = [
    "src/components/HomeFAQ.tsx",
    "src/data/faqData.ts",
    "src/pages/Categoria.tsx",
    "src/data/servicosData.ts",
  ];
  assert.match(guidance, /não existe prazo fixo/i);
  assert.match(guidance, /12 meses/);
  for (const file of files) {
    const s = read(file);
    assert.match(s, /PRAZO_(PRIMEIRA_CNH|ETAPAS_CNH|ADICAO_CATEGORIA)/, file);
    assert.doesNotMatch(s, /(?:média|médio) (?:de )?2 a 4 meses|Em média 30 a 60 dias|concluíram em 6 semanas|processo turbinado/i, file);
  }
});

test("Aulas e exames: não prometer aprovação, não confundir prazo de CNH com validade de exames", () => {
  const faq = read("src/data/faqData.ts");
  const cat = read("src/pages/Categoria.tsx");
  assert.match(faq, /2 horas-aula práticas para cada categoria/);
  assert.match(faq, /validade própria/);
  assert.doesNotMatch(cat, /95%|garantir aprovação|aprovação acima da média/);
  assert.doesNotMatch(read("src/data/servicosData.ts"), /95% de aprovação|quem mais aprova/);
});

test("Simulador antigo não aparece como recurso disponível em serviços", () => {
  const service = read("src/pages/Servico.tsx");
  assert.match(service, /href: "\/formas-estudo-teorico"/);
  assert.doesNotMatch(service, /href: "\/simulado-detran-pr"/);
  assert.doesNotMatch(service, /simulado gratuito de 30 questões/);
});

test("Datas e FAQs compartilhados entre conteúdo exibido e JSON-LD", () => {
  const home = read("src/components/HomeFAQ.tsx");
  const faq = read("src/pages/FAQ.tsx");
  const cat = read("src/pages/Categoria.tsx");
  const serv = read("src/pages/Servico.tsx");
  assert.match(home, /HOME_FAQS\.map/);
  assert.match(faq, /faqData\.map/);
  assert.match(cat, /data\.faqs\.map/);
  assert.match(serv, /data\.faqs\.map/);
});
