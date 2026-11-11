import test from "node:test";
import assert from "node:assert/strict";
import { fetchAllMarketingVercelRecords, marketingVercelCsv } from "../src/lib/marketingVercelExport.ts";

const record = (id, phone = "41999999999") => ({
  id, created_at: "2026-11-11T12:00:00Z", telefone: phone,
  campaign_source: "instagram", lgpd_aceite: true,
});
const reply = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
const endpoint = "https://autoescolaaptos-marketing-api-msolus.vercel.app/api/admin-marketing-optins";

test("Lê TODAS as páginas, sem gravar nem expor o token na URL", async () => {
  const calls = [], progress = [];
  const req = async (url, options) => {
    calls.push({ url, options });
    const cursor = new URL(url).searchParams.get("cursor");
    if (!cursor) return reply({ records: [record("a")], hasMore: true, cursor: "next-1" });
    if (cursor === "next-1") return reply({ records: [record("b", "41988888888")], hasMore: false, cursor: null });
    throw new Error("unexpected cursor");
  };
  const rows = await fetchAllMarketingVercelRecords(endpoint, "secret-test", count => progress.push(count), req);
  assert.deepEqual(rows.map(r => r.id), ["a", "b"]);
  assert.deepEqual(progress, [1, 2]);
  assert.equal(calls.length, 2);
  for (const c of calls) {
    assert.equal(c.options.method, "GET");
    assert.equal(c.options.headers["X-Aptos-Admin-Token"], "secret-test");
    assert.ok(!c.url.includes("secret-test"));
    assert.equal(new URL(c.url).searchParams.get("limit"), "40");
  }
});

test("Recusa exportação incompleta por falha HTTP", async () => {
  let i = 0;
  const req = async () => (++i === 1
    ? reply({ records: [record("a")], hasMore: true, cursor: "next" })
    : reply({ message: "error" }, 502));
  await assert.rejects(
    fetchAllMarketingVercelRecords(endpoint, "secret-test", undefined, req),
    /Backup incompleto não gerado/
  );
});

test("Recusa ciclo de paginação sem gerar CSV parcial", async () => {
  const req = async () => reply({ records: [record("a")], hasMore: true, cursor: "same" });
  await assert.rejects(fetchAllMarketingVercelRecords(endpoint, "secret-test", undefined, req), /duplicado entre páginas/);
});

test("Recusa resposta com registro inválido", async () => {
  const req = async () => reply({ records: [record("a", "invalid")], hasMore: false, cursor: null });
  await assert.rejects(fetchAllMarketingVercelRecords(endpoint, "secret-test", undefined, req), /Registro inválido/);
});

test("CSV preserva ID e protege contra fórmulas", () => {
  const csv = marketingVercelCsv([{ ...record("a"), campaign_source: "=HYPERLINK(\"https://example.org\")" }]);
  assert.ok(csv.startsWith("id,created_at,telefone,campaign_source,lgpd_aceite\r\n"));
  assert.ok(csv.includes('"41999999999"'));
  assert.ok(csv.includes("'=HYPERLINK"));
  assert.ok(!csv.includes(',"=HYPERLINK'));
});

test("Recusa credencial vazia antes de fazer rede", async () => {
  await assert.rejects(fetchAllMarketingVercelRecords(endpoint, " "), /Credencial/);
});
