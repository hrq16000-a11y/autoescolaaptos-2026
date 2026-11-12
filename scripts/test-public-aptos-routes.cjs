// Public QA: navigation and layout only. NEVER submit forms or create leads.
const { chromium } = require("playwright");
const BASE = "https://autoescolaaptos.com.br";
const routes = ["/perguntas-frequentes", "/1contato", "/inclusao-moto"];

async function verify(page, route, width) {
  const response = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 45000 });
  if (!response || response.status() >= 400) {
    throw Error(route + " HTTP " + (response ? response.status() : "no response"));
  }
  if (new URL(page.url()).pathname !== route) {
    throw Error(route + " unexpectedly redirected to " + page.url());
  }

  if (route === "/perguntas-frequentes") {
    await page.getByRole("heading", { level: 1, name: /Perguntas Frequentes/i }).waitFor({ state: "visible", timeout: 20000 });
    const first = page.locator('main .max-w-3xl button[data-state="closed"]').first();
    await first.waitFor({ state: "visible", timeout: 15000 });
    await first.click();
    await page.locator('main .max-w-3xl button[data-state="open"]').first().waitFor({ state: "visible", timeout: 8000 });
  } else if (route === "/1contato") {
    await page.getByRole("heading", { level: 1, name: /Vamos entender/i }).waitFor({ state: "visible", timeout: 20000 });
    await page.getByRole("progressbar", { name: /Etapa 1 de 3/i }).waitFor({ state: "visible" });
    await page.getByText("Você já dirige?", { exact: true }).waitFor({ state: "visible" });
  } else {
    await page.getByRole("heading", { level: 1, name: /Inclusão de categoria A/i }).waitFor({ state: "visible", timeout: 20000 });
    await page.getByText("Honda PCX", { exact: true }).first().waitFor({ state: "visible" });
    await page.getByText("Honda Fan 160", { exact: true }).first().waitFor({ state: "visible" });
    if (await page.locator('a[href^="/1contato"]').count() === 0) {
      throw Error("Moto campaign has no link to protected triage");
    }
  }

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  if (metrics.scrollWidth > metrics.viewportWidth + 8) {
    const overflowing = await page.evaluate(() => [...document.querySelectorAll("body *")]
      .map(el => ({ el, rect: el.getBoundingClientRect() }))
      .filter(({ el, rect }) => rect.width > 0 && rect.right > window.innerWidth + 5 && getComputedStyle(el).visibility !== "hidden")
      .slice(0, 12)
      .map(({ el, rect }) => ({
        tag: el.tagName, id: el.id, cls: String(el.className || "").slice(0, 90),
        right: Math.round(rect.right), width: Math.round(rect.width)
      })));
    throw Error(route + " horizontal overflow at " + width + "px: " + JSON.stringify({ metrics, overflowing }));
  }
  console.log("PASS " + width + "px " + route + ": rendered, navigable, no POST");
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  try {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 844 }, deviceScaleFactor: 1 });
      // Intercept ALL non-read HTTP requests in the test context; never persist fictitious data.
      await context.route("**/*", route => {
        const method = route.request().method();
        if (method !== "GET" && method !== "HEAD" && method !== "OPTIONS") {
          return route.abort("blockedbyclient");
        }
        return route.continue();
      });
      try {
        for (const route of routes) {
          const page = await context.newPage();
          try { await verify(page, route, width); }
          catch (error) { errors.push(width + "px " + route + ": " + error.message); console.error("FAIL " + width + "px " + route + ": " + error.message); }
          finally { await page.close(); }
        }
      } finally { await context.close(); }
    }
  } finally { await browser.close(); }
  if (errors.length) throw Error("Read-only routes QA failed:\n" + errors.join("\n"));
})().catch(error => { console.error(error); process.exit(1); });
