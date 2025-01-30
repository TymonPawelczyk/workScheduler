import { Page, expect } from "@playwright/test";
import availability from "../interfaces/availability";

function getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

function addDaysToDate(dateString: string, days: number): string {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Add the specified number of days
    date.setDate(date.getDate() + days);
  
    // Convert back to string in 'YYYY-MM-DD' format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  

export async function loginInto(page: Page, email: string, password: string): Promise<void> {
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(password);
    await page.getByText("Login").click();
}

export async function addAvailability(page: Page) {
    const startDate = '2024-11-25';
    const availabilityLink = page.getByRole('link', { name: '  Availability' });
    await availabilityLink.click();
    for (let index1 = 0; index1 < 5; index1++) {
        let typeSchift = getRandomElement(availability.Availability);
        let newDate = addDaysToDate(startDate, index1);
        console.log(typeSchift, newDate)
        let selectDate = page.getByTestId(`undefined.day_${newDate}`)
        await selectDate.click();
        await delay(500);
        const selectTypeShift = page.getByRole('combobox')
        await selectTypeShift.selectOption(`${typeSchift}`);
        await delay(500);
        await page.getByText('Add Availability').click();
        await delay(500);
        
    }
}
