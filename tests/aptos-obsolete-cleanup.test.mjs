import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const read = (p) => readFileSync(root + p, "utf8");

test("Automação antiga de deploy externo não disputa com o Lovable Cloud", () => {
  assert.equal(existsSync(root + ".github/workflows/deploy-marketing-optin.yml"), false);
  assert.equal(existsSync(root + "supabase/functions/marketing-optin/index.ts"), true, "Não remover função real");
  assert.equal(existsSync(root + "supabase/config.toml"), true, "Não remover configuração administrada pelo Lovable");
  const readme = read("README.md");
  assert.match(readme, /gerenciados pelo Lovable Cloud/);
  assert.match(readme, /Não crie outra conta Supabase/);
});

test("Home não anuncia modalidade de reciclagem ou total de FAQs sem prova", () => {
  const index = read("src/pages/Index.tsx");
  assert.doesNotMatch(index, /100% online \(EAD\), aprovado pelo DETRAN-PR/);
  assert.doesNotMatch(index, /\+80 dúvidas respondidas/);
  assert.match(index, /Consulte as modalidades autorizadas/);
  assert.match(index, /Dúvidas frequentes sobre CNH/);
});

test("Serviços mantêm o cartão de reciclagem sem alegar emissão garantida", () => {
  const serv = read("src/components/Services.tsx");
  assert.doesNotMatch(serv, /Certificado enviado ao DETRAN/);
  assert.match(serv, /Conclusão conforme as exigências do DETRAN-PR/);
});
