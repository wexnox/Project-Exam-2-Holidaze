import { test, expect } from '@playwright/test';

// Basic smoke test to verify that the app boots and renders the root page title or content.
// Adjust selectors/texts as the app evolves.

test('homepage loads', async ({ page }) => {
  await page.goto('/');

  // Expect an element that should exist on the landing page.
  // Try a few generic assertions to avoid flakiness if content changes.
  const hasH1 = await page.locator('h1').first().count();
  if (hasH1 > 0) {
    await expect(page.locator('h1').first()).toBeVisible();
  } else {
    // Fallback: check that body rendered some content
    await expect(page.locator('body')).toContainText(/holidaze|venue|book|login|search/i);
  }
});
