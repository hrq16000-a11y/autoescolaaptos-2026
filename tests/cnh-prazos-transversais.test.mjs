import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const load = p => readFileSync(new URL("../" + p, import.meta.url), "utf8");
const pages = ["src/pages/AutoescolaSaoJoseDosPinhais.tsx","src/pages/Comparador.tsx","src/pages/Resolucao1020.tsx","src/pages/Orcamento.tsx","src/pages/PrimeiraHabilitacao.tsx","src/components/Hero.tsx"];
test("todas as páginas prioritárias sem prazos prometidos ou taxas de aprovação sem fonte", () => {
 for(const p of pages) {
  const s=load(p);
  assert.doesNotMatch(s,/2 a 3 meses|2 a 4 meses|3 a 5 meses|30 a 60 dias|95%|aprovação garantida|Maior taxa de aprovação|quem mais aprova/i,p);
 }
});
test("comparador e JSON-LD tratam tempo de habilitação como variável",()=>{
 const s=load("src/pages/Comparador.tsx");
 assert.match(s,/tempo: "Sem prazo fixo"/);
 assert.match(s,/tempo: "Prazo variável"/);
 assert.doesNotMatch(s,/Tempo médio:|Sem refazer exames médicos\*/);
});
test("FAQ local utiliza o mesmo prazo compartilhado da Home e FAQ geral",()=>{
 const local=load("src/pages/AutoescolaSaoJoseDosPinhais.tsx");
 const general=load("src/data/faqData.ts");
 const home=load("src/components/HomeFAQ.tsx");
 assert.match(local,/a: PRAZO_PRIMEIRA_CNH/);
 assert.match(general,/answer: PRAZO_PRIMEIRA_CNH/);
 assert.match(home,/a: PRAZO_PRIMEIRA_CNH/);
});
test("conteúdo SEO de resolução e home não traz estimativas arbitrárias",()=>{
 assert.doesNotMatch(load("src/pages/Resolucao1020.tsx"),/O tempo médio para obter a CNH/);
 assert.doesNotMatch(load("src/components/Hero.tsx"),/Taxa de Aprovação/);
});
