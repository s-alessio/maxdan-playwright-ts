import { BASEURL } from '../config/testConfig';
import { test, expect } from './fixtures';
import { users } from '../config/users';



test.describe('Authorization tests', () => {
  test.beforeEach(async ({ page , header}, testInfo) => {
    const lang = testInfo.project.metadata.lang || 'en';
    //await page.goto(`/${lang}/home`);
    await page.goto(`${BASEURL}${lang}`);
    await header.linkToAuthForm.click();
  });

  test(`[TC-011] Successful login`, async ({ login, cabinet }) => {
    await login.submitLoginForm(users["with_subscription"]["email"],users["with_subscription"]["password"]);
    await expect(cabinet.mainPageTitle).toBeVisible();
  });

  test(`TC-012] Login with invalid username`, async ({ login }) => {
    await login.submitLoginForm("bububu"+users["with_subscription"]["email"],users["with_subscription"]["password"]);
    await expect(login.wrong_username_heading).toBeVisible();
  });

  test(`[TC-012] Login with invalid password`, async ({ login }) => {
    await login.submitLoginForm(users["with_subscription"]["email"],"bububu");
    await expect(login.wrong_password_heading).toBeVisible();
  });
});
