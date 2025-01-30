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

export async function addAvailability(page: Page): Promise<void> {}

