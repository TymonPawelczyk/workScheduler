import { Page, test, expect } from '@playwright/test';
import employees from '../interfaces/employees';
import { loginInto } from '../base/availability-base';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:8081/');
});

employees.Login.forEach(email => {
  const password = employees.Password;
  console.log(email, password);
  test.describe(`Adding availability for ${email}`, () => {
    test(`Login ${email}`, async ({page}) => {
      await loginInto(page, email, password)
    });
    test(`Add availability ${email}`, async ({page}) => {
      
    });
  });
});
