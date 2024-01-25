const { test, expect } = require("@playwright/test");
const { chromium } = require('playwright');

test.beforeAll(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Reset database before testing
    await page.goto('/api/init');
});

test("Main page gives a list of courses", async ({ page }) => {

    await page.goto("/");
    expect(await page.title()).toBe("Questions and answers");

    await expect(await page.locator("li")).toHaveText(["Art of literature", "Scalable web applications", "Introduction to mathematics"]);
});

test("Course page gives a list of questions", async ({ page }) => {

    await page.goto("/");
    await page.getByText('Scalable web applications', { exact: true }).click();

    await expect(await page.locator("li")).toHaveText("> My playwright tests all fail all the time and I have no idea why. Pls help! Vote\n         (0 votes) ");
});

test("New question gets prepended to question list", async ({ page }) => {
    test.slow();

    await page.goto("/");
    await page.getByText('Scalable web applications', { exact: true }).click();

    await expect(page.locator("h1")).toHaveText("Scalable web applications");

    await page.getByRole('textbox').fill("How do you use docker??");
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(await page.locator("li")).toHaveText(["> How do you use docker?? Vote\n        (0 votes) ",
        "> My playwright tests all fail all the time and I have no idea why. Pls help! Vote\n         (0 votes) "]);
});
  
test("Question page contains question text", async ({ page }) => {

    await page.goto("/");
    await expect(await page.locator("li")).toHaveText(["Art of literature", "Scalable web applications", "Introduction to mathematics"]);
    await page.getByText('Art of literature', { exact: true }).click();

    await expect(page.locator("h1")).toHaveText("Art of literature");
    await page.getByText('Perched upon a bust of Pallas just above my chamber door— Perched, and sat, and nothing more.', { exact: false }).click();

    await expect(page.locator("h1")).toHaveText("Question");
    const element = await page.getByText('Perched upon a bust of Pallas just above my chamber door— Perched, and sat, and nothing more.');
    await expect(element !== undefined).toBeTruthy();
});

test("New answer gets shown on question page", async ({ page }) => {
    test.slow();

    await page.goto("/");
    await expect(await page.locator("li")).toHaveText(["Art of literature", "Scalable web applications", "Introduction to mathematics"]);
    await page.getByText('Art of literature', { exact: true }).click();

    await expect(page.locator("h1")).toHaveText("Art of literature");
    await page.getByText('Perched upon a bust of Pallas just above my chamber door— Perched, and sat, and nothing more.', { exact: false }).click();

    await page.getByRole('textbox').fill("What??");
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(await page.locator("li")).toHaveText("What?? Vote\n        (0 votes) ");
});