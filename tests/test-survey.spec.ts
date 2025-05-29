import { BASEURL } from '../config/testConfig';
import { test, expect } from './fixtures';
import { users } from '../config/users';

test.describe('Unauthorized user pass survey', () => {
  test.beforeEach(async ({ page , header}, testInfo) => {
    const lang = testInfo.project.metadata.lang || 'en';
    await page.goto(`${BASEURL}${lang}`);
    await header.linkToSurvey.click();
  });

  test(`[TC-016] Unauthorized user pass survey and get recommendations`, async ({ survey, login, cabinet }) => {
    const sum = survey.getRandomInt(10000,100000);
    await survey.pass_survey("John",sum.toString());
    await login.switch_to_auth_form();
    await login.submitLoginForm(users["no_agreement"]["email"],users["no_agreement"]["password"]);
    await cabinet.check_that_there_is_cont_or_delete_dialog();
    await cabinet.click_delete_survey_results_button();
    await expect(cabinet.mainPageTitle).toBeVisible();
  });

});