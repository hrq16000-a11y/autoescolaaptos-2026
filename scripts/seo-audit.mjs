#!/usr/bin/env node
/**
 * Auditoria contínua de SEO (build-time).
 *
 * Verifica:
 *  - index.html: title, meta description, canonical, og/twitter
 *  - public/robots.txt: presença, diretiva Sitemap, bloqueio global indevido
 *  - public/sitemap.xml: URLs válidas, duplicadas, conflito com robots (Disallow)
 *  - src/pages/**: presença de <SEO .../> ou <Helmet> com title/description/canonical
 *
 * Saída: public/seo-audit.json (relatório visualizável em /admin/growth),
 * mantendo o snapshot anterior em `previous` para comparação Antes/Depois.
 *
 * Falha o build somente com erros críticos (summary.errors > 0); avisos são informativos.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "seo-audit.json");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

const issues = [];
const add = (severity, area, message) => issues.push({ severity, area, message });

// ---------- index.html ----------
const html = read(join(ROOT, "index.html")) ?? "";
const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
const description =
  html.match(/<meta[^>]*\sname=["']description["'][^>]*\scontent=["']([\s\S]*?)["']/i)?.[1]?.trim() ?? "";
const canonical =
  html.match(/<link[^>]*\srel=["']canonical["'][^>]*\shref=["']([^"']+)["']/i)?.[1] ?? "";

if (!title) add("error", "metatags", "index.html sem <title>.");
else if (/lovable app/i.test(title)) add("error", "metatags", "Title padrão do template.");
else if (title.length > 65) add("warn", "metatags", `Title com ${title.length} caracteres (>65).`);

if (!description) add("error", "metatags", "index.html sem meta description.");
else if (description.length > 165)
  add("warn", "metatags", `Meta description com ${description.length} caracteres (>165).`);

if (!/og:title/i.test(html)) add("warn", "metatags", "og:title ausente no index.html.");
if (!/twitter:card/i.test(html)) add("warn", "metatags", "twitter:card ausente no index.html.");

// ---------- contrato de imagem social ----------
const socialTags = (key) => [...html.matchAll(/<meta\b[^>]*>/gi)]
  .filter(([tag]) => tag.includes(`property="${key}"`) || tag.includes(`name="${key}"`))
  .map(([tag]) => ({ content: tag.match(/\bcontent="([^"]*)"/)?.[1] ?? "", managed: tag.includes('data-react-helmet="true"') }));
const social = (key) => {
  const values = socialTags(key);
  if (values.length !== 1 || !values[0]?.content) {
    add("error", "social", `${key}: esperado exatamente um metadado preenchido no HTML inicial.`);
    return "";
  }
  if (!values[0].managed) add("error", "social", `${key}: fallback não gerenciado pelo Helmet (risco de duplicação).`);
  return values[0].content;
};
const expectedImage = "https://autoescolaaptos.com.br/social-preview.png";
const socialUrl = social("og:image");
const socialWidth = social("og:image:width");
const socialHeight = social("og:image:height");
const socialType = social("og:image:type");
const socialAlt = social("og:image:alt");
if (socialUrl !== expectedImage || social("twitter:image") !== expectedImage)
  add("error", "social", "OG e Twitter devem usar o mesmo fallback HTTPS próprio.");
if (social("twitter:image:alt") !== socialAlt || social("twitter:card") !== "summary_large_image")
  add("error", "social", "Twitter Card deve compartilhar o alt e o formato de imagem grande.");
for (const key of ["og:title", "og:description", "og:type", "og:url", "og:site_name", "og:locale", "twitter:title", "twitter:description"]) social(key);
const socialFile = join(ROOT, "public", "social-preview.png");
const imageBytes = existsSync(socialFile) ? readFileSync(socialFile) : Buffer.alloc(0);
if (imageBytes.length < 24 || imageBytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a" || imageBytes.toString("ascii", 12, 16) !== "IHDR") {
  add("error", "social", "public/social-preview.png ausente ou inválido.");
} else {
  const width = imageBytes.readUInt32BE(16), height = imageBytes.readUInt32BE(20);
  if (width !== 1200 || height !== 630 || socialWidth !== String(width) || socialHeight !== String(height) || socialType !== "image/png")
    add("error", "social", "Dimensões/tipo do PNG não correspondem aos metadados de compartilhamento.");
  if (imageBytes.length > 150_000) add("error", "social", "PNG social excede o orçamento de 150 kB.");
}
const socialConfig = read(join(ROOT, "src", "lib", "social-preview.ts")) ?? "";
for (const value of [`url: "${expectedImage}"`, "width: 1200", "height: 630", 'type: "image/png"', `alt: "${socialAlt}"`]) {
  if (!socialConfig.includes(value)) add("error", "social", "Fallback do componente SEO diverge do HTML inicial: " + value);
}

// ---------- robots.txt ----------
const robots = read(join(ROOT, "public", "robots.txt"));
const disallowed = [];
if (!robots) add("error", "robots", "public/robots.txt não encontrado.");
else {
  if (!/^Sitemap:\s*https?:\/\//im.test(robots))
    add("warn", "robots", "robots.txt sem diretiva Sitemap.");
  for (const line of robots.split(/\r?\n/)) {
    const m = line.match(/^\s*Disallow:\s*(\S+)\s*$/i);
    if (m && m[1] !== "/") disallowed.push(m[1].replace(/\*$/, ""));
  }
  if (/^\s*User-agent:\s*\*\s*$[\s\S]*?^\s*Disallow:\s*\/\s*$/im.test(robots))
    add("error", "robots", "robots.txt bloqueia todo o site para crawlers (Disallow: /).");
}

// ---------- sitemap.xml ----------
const sitemap = read(join(ROOT, "public", "sitemap.xml"));
let urls = [];
if (!sitemap) add("error", "sitemap", "public/sitemap.xml não encontrado.");
else {
  urls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) add("error", "sitemap", "sitemap.xml sem nenhuma URL.");
  const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
  if (dupes.length) add("error", "sitemap", `URLs duplicadas: ${[...new Set(dupes)].join(", ")}`);
  for (const u of urls) {
    if (!/^https:\/\//.test(u)) add("error", "sitemap", `URL não-https no sitemap: ${u}`);
    const path = u.replace(/^https?:\/\/[^/]+/, "") || "/";
    const blocked = disallowed.find((d) => d !== "/" && path.startsWith(d));
    if (blocked) add("error", "sitemap", `URL ${path} está no sitemap mas bloqueada em robots (${blocked}).`);
    if (/\?/.test(u)) add("warn", "sitemap", `URL com query string no sitemap: ${u}`);
  }
}

// ---------- páginas ----------
const pagesDir = join(ROOT, "src", "pages");
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".tsx") ? [p] : [];
  });

const pages = existsSync(pagesDir) ? walk(pagesDir) : [];
const pageReport = [];
for (const file of pages) {
  const src = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  const isAdmin = /(^|\/)admin(\/|\.)/.test(rel) || /noindex/i.test(src);
  const hasSeo = /<SEO\b/.test(src);
  const hasHelmet = /<Helmet\b/.test(src);
  const hasTitle = hasSeo ? /title=/.test(src) : /<title>/.test(src);
  const hasDesc = hasSeo ? /description=/.test(src) : /name=["']description["']/.test(src);
  const hasCanonical = hasSeo ? /canonical=/.test(src) : /rel=["']canonical["']/.test(src);
  const ok = (hasSeo || hasHelmet) && hasTitle && hasDesc && (hasCanonical || isAdmin);
  pageReport.push({ file: rel, hasSeo, hasHelmet, hasTitle, hasDesc, hasCanonical, noindex: isAdmin, ok });
  if (!ok && !isAdmin) {
    add("warn", "paginas", `${rel}: faltam ${[
      !hasTitle && "title",
      !hasDesc && "description",
      !hasCanonical && "canonical",
    ].filter(Boolean).join(", ")}.`);
  }
}

// ---------- relatório ----------
const previous = (() => {
  try {
    const old = JSON.parse(readFileSync(OUT, "utf8"));
    return { generatedAt: old.generatedAt, summary: old.summary };
  } catch {
    return null;
  }
})();

const summary = {
  errors: issues.filter((i) => i.severity === "error").length,
  warnings: issues.filter((i) => i.severity === "warn").length,
  sitemapUrls: urls.length,
  pagesChecked: pageReport.length,
  pagesOk: pageReport.filter((p) => p.ok).length,
};

const report = {
  generatedAt: new Date().toISOString(),
  summary,
  previous,
  head: { title, description, canonical },
  robots: { present: Boolean(robots), disallowed },
  issues,
  pages: pageReport,
};

writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log(
  `seo-audit: ${summary.errors} erro(s), ${summary.warnings} aviso(s), ${summary.sitemapUrls} URLs, ${summary.pagesOk}/${summary.pagesChecked} páginas OK → public/seo-audit.json`
);

// Erros reais de SEO devem impedir integração/publicação; avisos não bloqueiam.
if (summary.errors > 0) {
  console.error(`seo-audit: build interrompido por ${summary.errors} erro(s) crítico(s) de SEO.`);
  process.exitCode = 1;
}
