import { test, expect } from '@playwright/test';
import employees from '../interfaces/employees';
import { loginInto } from '../base/availability-base';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:8081/');
});

test('Login user', async ({ page }) => {
  employees.Login.forEach(async (email) => {
    await loginInto(page, email, employees.Password);
  })
});

test('Add availability', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await expect(page.getByText('Welcome👋')).toBeVisible();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('testemp1@test.com');
  await page.getByPlaceholder('Email').press('Tab');
  await page.getByPlaceholder('Password').fill('test123');
  await page.locator('div').filter({ hasText: /^Login$/ }).first().click();
  await page.getByRole('link', { name: '  Availability' }).click();
  await page.getByTestId('undefined.day_2024-11-12').click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
  await page.getByTestId('undefined.day_2024-11-13').click();
  await page.getByText('Add Availability').click();
  await page.getByTestId('undefined.day_2024-11-14').click();
  await page.getByText('Add Availability').click();
  await page.getByTestId('undefined.day_2024-11-15').click();
  await page.getByText('Add Availability').click();
  await page.getByTestId('undefined.day_2024-11-18').click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
  await page.getByTestId('undefined.day_2024-11-19').click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
  await page.getByTestId('undefined.day_2024-11-20').click();
  await page.getByText('Add Availability').click();
  await page.getByTestId('undefined.day_2024-11-21').click();
  await page.getByText('Add Availability').click();
  await page.locator('div').filter({ hasText: /^22$/ }).first().click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
  await page.getByTestId('undefined.day_2024-11-25').click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
  await page.getByTestId('undefined.day_2024-11-26').click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
  await page.getByTestId('undefined.day_2024-11-27').click();
  await page.getByText('Add Availability').click();
  await page.getByTestId('undefined.day_2024-11-28').click();
  await page.getByText('Add Availability').click();
  await page.getByTestId('undefined.day_2024-11-29').click();
  await page.locator('div').filter({ hasText: /^Add Availability$/ }).first().click();
});