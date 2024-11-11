import { Page, test, expect } from "@playwright/test";
import employees from "../interfaces/employees";

export async function loginInto(page: Page, login: string, password: string): Promise<void> {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(login);
    await page.getByPlaceholder('Email').press('Tab');
    await page.getByPlaceholder('Password').fill(password);
    await page.locator('div').filter({ hasText: /^Login$/ }).first().click();
}
