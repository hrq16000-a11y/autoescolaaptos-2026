import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const source = readFileSync(new URL("../src/pages/UmContato.tsx", import.meta.url), "utf8");
test("Efeito decorativo não ultrapassa viewport mobile", () => {
  assert.match(source, /pointer-events-none absolute inset-0 md:hidden bg-gradient/);
  assert.doesNotMatch(source, /pointer-events-none absolute -inset-6 md:hidden/);
});
test("Lead confirmado antes de redirecionar ao WhatsApp", () => {
  assert.match(source, /supabase\.functions\.invoke\("submit-triagem"/);
  assert.match(source, /receipt\?\.ok !== true/);
  assert.match(source, /window\.location\.href = whatsappLink/);
});
