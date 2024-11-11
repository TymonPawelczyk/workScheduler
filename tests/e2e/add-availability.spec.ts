import { Page, test, expect } from '@playwright/test';
import employees from '../interfaces/employees';
import { loginInto } from '../base/availability-base';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:8081/');
});

test('Add availability', async ({ page }) => {
  await expect(page.getByText('Welcome')).toBeVisible();
});
