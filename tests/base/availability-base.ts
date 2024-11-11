import { Page, expect } from "@playwright/test";

export async function loginInto(page: Page, login: string, password: string): Promise<void> {
    await page.goto('http://localhost:8081/');
    await expect(page.getByText('Welcome')).toBeVisible();
    const emailField = page.getByRole('textbox').first();
    await emailField.fill(login);
    const passwordField = page.getByRole('textbox').nth(1);
    await passwordField.fill(password);
    await page.locator('div').filter({ hasText: /^Login$/ }).first().click();
}
