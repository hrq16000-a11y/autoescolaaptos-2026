// Exportação administrativa somente leitura. Não envia nem altera cadastros.
export type MarketingVercelRecord = {
  id: string;
  telefone: string;
  created_at: string;
  campaign_source: string | null;
  lgpd_aceite: boolean;
};
type VercelPage = {
  records: MarketingVercelRecord[];
  hasMore: boolean;
  cursor: string | null;
  message?: string;
};
function escapedCsv(value: unknown): string {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}
export function marketingVercelCsv(rows: MarketingVercelRecord[]): string {
  const fields = ["id", "created_at", "telefone", "campaign_source", "lgpd_aceite"] as const;
  return [
    fields.join(","),
    ...rows.map(row => fields.map(field => escapedCsv(row[field])).join(",")),
  ].join("\r\n");
}
export async function fetchAllMarketingVercelRecords(
  endpoint: string,
  token: string,
  onProgress?: (count: number) => void,
  request: typeof fetch = fetch,
): Promise<MarketingVercelRecord[]> {
  if (!token.trim()) throw new Error("Credencial administrativa obrigatória.");
  const all: MarketingVercelRecord[] = [];
  const ids = new Set<string>();
  const cursors = new Set<string>();
  let cursor: string | null = null;
  // Gera um único arquivo apenas depois de receber TODAS as páginas.
  for (let page = 0; page < 10_000; page++) {
    const url = new URL(endpoint);
    url.searchParams.set("limit", "40");
    if (cursor) url.searchParams.set("cursor", cursor);
    const response = await request(url.toString(), {
      method: "GET",
      headers: { "X-Aptos-Admin-Token": token.trim() },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(response.status === 401
        ? "Credencial administrativa inválida."
        : "Falha na leitura dos cadastros (HTTP " + response.status + "). Backup incompleto não gerado.");
    }
    const result = await response.json() as VercelPage;
    if (!result || !Array.isArray(result.records) || typeof result.hasMore !== "boolean") {
      throw new Error("Resposta administrativa inválida. Backup interrompido.");
    }
    for (const row of result.records) {
      if (!row || typeof row.id !== "string" || !row.id ||
        typeof row.telefone !== "string" || !/^\d{10,13}$/.test(row.telefone) ||
        typeof row.created_at !== "string" || !row.created_at ||
        (row.campaign_source !== null && typeof row.campaign_source !== "string") ||
        typeof row.lgpd_aceite !== "boolean") {
        throw new Error("Registro inválido. Backup interrompido para evitar perda.");
      }
      if (ids.has(row.id)) {
        throw new Error("Registro duplicado entre páginas. Backup interrompido.");
      }
      ids.add(row.id);
      all.push(row);
    }
    onProgress?.(all.length);
    if (!result.hasMore) return all;
    if (!result.records.length || typeof result.cursor !== "string" || !result.cursor ||
      cursors.has(result.cursor)) {
      throw new Error("Paginação incompleta. Backup interrompido.");
    }
    cursors.add(result.cursor);
    cursor = result.cursor;
  }
  throw new Error("Limite de páginas ultrapassado. Backup interrompido.");
}
