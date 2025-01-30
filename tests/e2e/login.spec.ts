import { Page, test } from "@playwright/test";
import employees from "../interfaces/employees";
import menagers from "../interfaces/menager";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:8081/');
});

employees.Login.forEach(email => {}); // This is a placeholder for the test

menagers.Login.forEach(email => {}); // This is a placeholder for the test