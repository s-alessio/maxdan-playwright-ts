import { Page } from '@playwright/test';
import { mainPage } from '../config/translations';

export class Header {
  constructor(private readonly page: Page, 
    private readonly lang: string) {}

  get linkToAuthForm() {
    return this.page.getByRole('link', { name: mainPage["auth_form_icon"][this.lang] });
  }

  get linkToSurvey() {
    return this.page.getByRole('link', { name: mainPage["survey_link"][this.lang] });
  }

}