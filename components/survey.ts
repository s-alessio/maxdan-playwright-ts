import { Page, expect } from '@playwright/test';
import { surveyModule } from '../config/translations';

export class Survey {
  constructor(private readonly page: Page, 
    private readonly lang: string) {}


    getRandomInt(min: number, max: number): number {
        const lower = Math.ceil(min);
        const upper = Math.floor(max);
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    get nextButton() {
        return this.page.locator('#surveyFrame').contentFrame().getByRole('button', { name: surveyModule["next_button"][this.lang] });
    }

    get continueButton() {
        return this.page.locator('#surveyFrame').contentFrame().getByRole('button', { name: surveyModule["continue_button"][this.lang] });
    }

    get answers(){
        return this.page.locator('#surveyFrame').contentFrame().getByRole('radio');
    }

    get go_to_login_button(){
        return this.page.locator('#surveyFrame').contentFrame().locator("#linkToAnotherPage");
    }

    async answer_about_name(name: string){
        await expect(this.nextButton).toBeVisible({ timeout: 60000 });
        await this.page.locator('#surveyFrame').contentFrame().getByRole('textbox', { name: surveyModule["what_is_your_name"][this.lang] }).fill(name);
        await this.nextButton.click();
    }

    async choose_answer(progress_percent: string){
        await expect(this.page.locator('#surveyFrame').contentFrame().getByRole("progressbar")).toHaveAttribute("aria-valuenow",progress_percent, {timeout: 60000});
        await expect(this.nextButton).toBeVisible({ timeout: 60000 });
        const answers = await this.answers.all();
        await this.answers.nth(this.getRandomInt(0,answers.length-1)).click();
        await this.nextButton.click();
    }

    async answer_about_sum(sum: string){
        await expect(this.page.locator('#surveyFrame').contentFrame().getByRole("progressbar")).toHaveAttribute("aria-valuenow","71", {timeout: 60000});
        await expect(this.nextButton).toBeVisible({ timeout: 60000 });
        const input = this.page.locator('#surveyFrame').contentFrame().locator('input[type="number"][name="answer"]');
        await input.fill(sum);
        await this.nextButton.click();
    }

    async confirm_risk_level(){
        await expect(this.page.locator('#surveyFrame').contentFrame().getByRole("progressbar")).toHaveAttribute("aria-valuenow","100", {timeout: 60000});
        await expect(this.continueButton).toBeVisible({ timeout: 60000 });
        await this.continueButton.click();
    }

    async unauth_user_confirm_portfolio(){
        await expect(this.go_to_login_button).toBeVisible({ timeout: 60000 });
        await this.go_to_login_button.click();
    }

    async pass_survey(name:string, sum: string){
        await this.answer_about_name(name);
        await this.choose_answer("14");
        await this.choose_answer("29");
        await this.choose_answer("43");
        await this.choose_answer("57");
        await this.answer_about_sum(sum);
        await this.choose_answer("86");
        await this.confirm_risk_level();
        await this.unauth_user_confirm_portfolio();
    }

  }