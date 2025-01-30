import { Page, expect } from "@playwright/test";


export async function loginInto(page: Page, email: string, password: string): Promise<void> {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(password);
    await page.getByText("Login").click();
}