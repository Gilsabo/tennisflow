import test, { expect } from '@playwright/test';

test('navigation login', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/Tennisflow | all about tennis/);

  await page.getByRole('link', { name: 'Log in' }).click();
  await expect(page).toHaveURL(/.*login/);
});

test('navigation login to profile', async ({ page }) => {
  await page.goto('/login');

  const userNameInput = page.locator('#user-name');
  await userNameInput.fill('your-username');

  const userPasswordInput = page.locator('#passowrd');
  await userPasswordInput.fill('your-username');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test('navigation register', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Tennisflow | all about tennis/);

  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL(/.*register/);
});

test('profile form', async ({ page }) => {
  await page.goto('/dashboard/profile/gil');
  await page.getByTestId('profile-first-name').click();
  await page.getByTestId('profile-first-name').fill('Gil');
  await page.getByTestId('profile-first-name').press('Tab');
  await page.getByTestId('profile-last-name').fill('Sala');
  await page.getByTestId('profile-last-name').press('Tab');
});
