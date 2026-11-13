import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const page = readFileSync("src/pages/InclusaoCategoriaA.tsx","utf8");
const popup = readFileSync("src/components/CampaignCelebration.tsx","utf8");
const router = readFileSync("src/App.tsx","utf8");
const home = readFileSync("src/pages/Index.tsx","utf8");
const triage = readFileSync("src/pages/UmContato.tsx","utf8");
const sitemap = readFileSync("public/sitemap.xml","utf8");

test("rota /inclusao-moto publicada pelo React Router e canonical único", () => {
  assert.match(router, /<Route path="\/inclusao-moto" element=\{<InclusaoCategoriaA \/>\}/);
  assert.match(router, /path="\/inclusao-categoria-a" element=\{<Navigate to="\/inclusao-moto" replace \/>\}/);
  assert.match(page, /const PATH = "\/inclusao-moto"/);
  assert.match(page, /canonical=\{PATH\}/);
  assert.match(sitemap, /https:\/\/autoescolaaptos\.com\.br\/inclusao-moto/);
  assert.doesNotMatch(sitemap, /https:\/\/autoescolaaptos\.com\.br\/inclusao-categoria-a/);
});

test("campanha exibe oferta e separa as taxas do DETRAN", () => {
  assert.match(page, /R\$ 750/);
  assert.match(page, /Taxas do DETRAN não inclusas/);
  assert.match(page, /R\$ 299/);
  assert.doesNotMatch(page, /R\$ 399/);
  assert.match(page, /Honda PCX/);
  assert.match(page, /Honda Fan 160/);
});

test("links e mídia têm URL estável, sem imagem local 404", () => {
  assert.doesNotMatch(page, /\/campanhas\/categoria-a\/(pcx|fan160)-aptos-real\.webp/);
  assert.doesNotMatch(page, /Materiais visuais da campanha|poster-vertical-2026\.png/);
  assert.match(page, /id="motos-em-destaque"/);
  assert.match(page, /aspect-\[3\/2\] w-full object-cover/);
  assert.match(page, /aptos-pcx-real-tratada-2026\.webp/);
  assert.match(page, /aptos-fan160-tratada-2026\.webp/);
  assert.match(page, /imagem: pcxPhoto/);
  assert.match(page, /imagem: fanPhoto/);
  assert.match(home, /to="\/inclusao-moto"/);
  assert.match(home, /HomeMotoCallout/);
  assert.match(home, /R\$ 750/);
});

test("captação é feita antes do WhatsApp e mantém a moto e UTMs", () => {
  assert.match(page, /qs\.set\("moto", moto\)/);
  assert.match(page, /qs\.set\("origem", CAMPAIGN\)/);
  assert.match(page, /utm_source/);
  assert.match(triage, /motoCampanha/);
  assert.match(triage, /inclusao_moto_\$\{motoCampanha\}/);
  assert.match(triage, /Moto de interesse/);
  assert.match(triage, /persistence_not_confirmed/);
  assert.match(triage, /submit-triagem/);
});


test("validade da oferta, contagem regressiva e popup acessível sem escassez fictícia", () => {
  assert.equal(new Date("2026-12-01T00:00:00-03:00").toISOString(), "2026-12-01T03:00:00.000Z");
  assert.match(page, /CAMPAIGN_DEADLINE = Date\.parse\("2026-12-01T00:00:00-03:00"\)/);
  assert.match(page, /priceValidUntil: "2026-11-30"/);
  assert.match(page, /campaignActive \? \(/);
  assert.match(page, /Campanha encerrada em 30\/11\/2026/);
  assert.match(page, /<CampaignCelebration active=\{campaignActive\}/);
  assert.match(popup, /POPUP_SEEN_KEY/);
  assert.match(popup, /useReducedMotion/);
  assert.match(popup, /playCelebrationSound\(\); setBurst/);
  assert.match(popup, /to=\{triagem\}/);
  assert.match(popup, /Vagas limitadas, com disponibilidade confirmada pela equipe/);
  assert.match(home, /campaignActive \? "Por tempo limitado/);
  assert.match(home, /src=\{pcxPhoto\}/);
  assert.doesNotMatch(home, /banner-horizontal-2026\.png/);
  assert.doesNotMatch(popup, /15 reservas|20 vagas|15 pessoas/);
  assert.doesNotMatch(popup, /autoPlay|autoplay/);
});
