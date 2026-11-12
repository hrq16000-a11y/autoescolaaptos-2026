import { test, expect } from '@playwright/test';

test('URL antiga do simulado encaminha ao guia teórico sem gravações', async ({ page }) => {
  const writes: string[] = [];
  page.on('request', req => { if (!['GET', 'HEAD'].includes(req.method())) writes.push(req.url()); });
  await page.goto('/simulado-detran-pr');
  await expect(page).toHaveURL(/\/formas-estudo-teorico\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).not.toContainText('Simulado DETRAN');
  expect(writes).toEqual([]);
});
