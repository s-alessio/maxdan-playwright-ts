import { test as base } from '@playwright/test';
import { LoginAuthModule } from '../components/login_auth_form';
import { CabinetPages } from '../pages/cabinet';
import { Header } from '../components/header';
import { Survey } from '../components/survey';

type MyFixtures = {
  login: LoginAuthModule;
  cabinet: CabinetPages;
  header: Header;
  survey: Survey;
  lang: string;
};

export const test = base.extend<MyFixtures>({
  lang: async ({}, use, testInfo) => {
    const lang = testInfo.project.metadata?.lang || 'en';
    await use(lang);
  },

  login: async ({ page, lang }, use) => {
    await use(new LoginAuthModule(page, lang));
  },

  cabinet: async ({ page, lang }, use) => {
    await use(new CabinetPages(page, lang));
  },

  header: async ({ page, lang }, use) => {
    await use(new Header(page, lang));
  },

  survey: async ({ page, lang }, use) => {
    await use(new Survey(page, lang));
  },
});

export { expect } from '@playwright/test';
