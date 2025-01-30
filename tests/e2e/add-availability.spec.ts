import { Page, test, expect } from '@playwright/test';
import employees from '../interfaces/employees';
import { addAvailability } from '../page/availability-page';
import { loginInto } from '../page/login-page';

const password = employees.Password;

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:8081/');
});

employees.Login.forEach(email => {
  test.describe(`Adding availability for ${email}`, () => {
    test(`Login ${email}`, async ({page}) => {
      await loginInto(page, email, password);
    });
    test(`Add availability ${email}`, async ({page}) => {
      await loginInto(page, email, password);
      await addAvailability(page);
    });
  });
});
