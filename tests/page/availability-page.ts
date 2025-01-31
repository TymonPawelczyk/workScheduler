import { Page, expect } from "@playwright/test";

let today = new Date();
const todayDay = Number(today.getDate().toString().padStart(2, '0'));

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

function isLastDayOfMonth(date: Date): boolean {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() === date.getDate();
}

function addDays(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export async function addAvailability(page: Page, daysForward: number): Promise<void> {
  await page.locator("//span[text()='Availability']").click();
  for (let i = 0; i < daysForward; i++) {
    if (isLastDayOfMonth(addDays(today, i))) {
      const randomShift = getRandomInt(3);
      const day = addDays(today, i+1).getDate().toString().padStart(0, '0');
      const dayLocator = page.locator(`//div[contains(@class,'r-color-1sli5lp')][text()='${day}']`);
      await dayLocator.click();
      if (randomShift === 0) {
        await page.getByRole('combobox').click();
        await page.getByRole('combobox').selectOption('MORNING');
        await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
        await delay(1000);
      }
      else if (randomShift === 1) {
        await page.getByRole('combobox').click();
        await page.getByRole('combobox').selectOption('AFTERNOON');
        await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
        await delay(1000);
      }
      else if (randomShift === 2) {
        await page.getByRole('combobox').click();
        await page.getByRole('combobox').selectOption('NIGHT');
        await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
        await delay(1000);
      }
    } else {
      const randomShift = getRandomInt(3);
      const day = addDays(today, i+1).getDate().toString().padStart(0, '0');
      const dayLocator = page.locator(`//div[contains(@class,'r-color-cqee49')][text()='${day}']`).first();
      await dayLocator.click();
      await delay(500);
      if (randomShift === 0) {
        await page.getByRole('combobox').click();
        await page.getByRole('combobox').selectOption('MORNING');
        await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
        await delay(1000);
      }
      else if (randomShift === 1) {
        await page.getByRole('combobox').click();
        await page.getByRole('combobox').selectOption('AFTERNOON');
        await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
        await delay(1000);
      }
      else if (randomShift === 2) {
        await page.getByRole('combobox').click();
        await page.getByRole('combobox').selectOption('NIGHT');
        await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
        await delay(1000);
      }
    }
  }
}

