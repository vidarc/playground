import { test, expect } from '@playwright/test';

test('it works as expected', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByText(
      'Hello. I am Matthew Ailes. This will be something at some point.',
    ),
  ).toBeVisible();

  await expect(page.getByAltText('Tottenham Hotspur')).toBeVisible();
  await expect(page.getByAltText('DC United')).toBeVisible();
  await expect(page.getByAltText('Richmond Kickers')).toBeVisible();

  await page.goto('/one');
  await expect(page.getByText('This is page one')).toBeVisible();

  await page.goto('/two');
  await expect(page.getByText('This is page two')).toBeVisible();
});
