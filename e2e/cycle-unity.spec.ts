import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const email = process.env.TEST_USER_EMAIL;
const password = process.env.TEST_USER_PASSWORD;

test('User flow on Desktop: login, change name, create event, mark as joined, check for it in hosted and going, write comment, mark as declined, delete event, sign out', async ({
  page,
}) => {
  page.setViewportSize({ width: 1920, height: 1200 });
  await page.goto('/');
  await page.getByPlaceholder('email@mail.com').fill(email as string);
  await page.getByPlaceholder('YourPassword').fill(password as string);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'label Profile' }).click();
  await page.getByPlaceholder('John').fill('TestBot');
  const testId = uuidv4();
  await page.getByPlaceholder('Rider').fill(testId);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'label Events' }).click();
  await page.getByRole('button', { name: 'label New Event' }).click();
  await page.getByPlaceholder('My title').fill('Test Event');
  await page.getByPlaceholder('My details').fill('Testing');
  await page.getByLabel('Datepicker input').click();
  await page.getByLabel('Open years overlay').click();
  await page.getByText('2030').click();
  await page.getByLabel('Open months overlay').click();
  await page.getByText('Jan').click();
  await page.locator('[id="\\32 030-01-01"]').getByText('1').click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Private' }).click();
  await page.getByRole('button', { name: 'Marker' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText(`TestBot ${testId}`)).toHaveCount(1);
  await page.getByText('Hosted').click();
  await expect(page.getByText(`TestBot ${testId}`)).toHaveCount(1);
  const post = page.getByText(`TestBot ${testId}PrivateEvent:`);
  await post.getByRole('button', { name: 'label Join event' }).click();
  await page.getByText('Going').click();
  await expect(page.getByText('Event: Test Event')).toHaveCount(1);
  await post.getByRole('button', { name: 'label Decline Event' }).click();
  await page.getByText('Hosted').click();
  await post.getByRole('button', { name: 'label', exact: true }).click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Event: Test Event')).toHaveCount(0);
  await page.locator('a').filter({ hasText: 'Profile' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});
