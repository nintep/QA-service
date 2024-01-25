const { test, expect } = require("@playwright/test");

test("Test stub", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Questions and answers");
});
