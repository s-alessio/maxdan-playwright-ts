import { Page, expect } from '@playwright/test';
import { loginForm, cabinet } from '../config/translations';


export class CabinetPages {
  constructor(private readonly page: Page, 
    private readonly lang: string) {}

  get mainPageTitle() {
    return this.page.frameLocator('iframe[title="cabinet"]')
    .getByRole('heading', { name: cabinet['select_menu_item'][this.lang] });
  }

  get continue_create_portfolio_button(){
    return this.page.locator("#blockrandom-173").contentFrame().locator("#yesButton");
  }

  get delete_survey_results_button(){
    return this.page.locator("#blockrandom-173").contentFrame().locator("#noButton");
  }

  get cont_or_del_title(){
    return this.page.locator("#blockrandom-173").contentFrame().getByRole("heading", {name:cabinet["cont_or_del_title"][this.lang]});
  }

  async check_that_there_is_cont_or_delete_dialog(){
    await expect(this.cont_or_del_title).toBeVisible({ timeout: 15000 });
  }

  async check_that_there_is_no_cont_or_delete_dialog(){
    await expect(this.cont_or_del_title).not.toBeVisible({ timeout: 5000 });
  }

  async click_continue_create_portfolio_button(){
    await this.continue_create_portfolio_button.click();
  }

  async click_delete_survey_results_button(){
    await this.delete_survey_results_button.click();
  }
}
