import { expect, Page, test } from "@playwright/test";
import employees from "../interfaces/employees";
import menagers from "../interfaces/menager";
import { loginInto } from "../page/login-page";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:8081/');
});

employees.Login.forEach(email => {
    test(`Login ${email}`, async ({page}) => {
        expect(await loginInto(page, email, employees.Password)).toBeTruthy();
    });
}); // This is a placeholder for the test

menagers.Login.forEach(email => {
    test(`Login ${email}`, async ({page}) => {
        expect(await loginInto(page, email, menagers.Password)).toBeTruthy();
    });
}); // This is a placeholder for the test