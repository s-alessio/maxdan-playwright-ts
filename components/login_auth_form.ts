import { Page } from '@playwright/test';
import { loginForm, cabinet } from '../config/translations';


export class LoginAuthModule {
  constructor(private readonly page: Page, 
    private readonly lang: string) {}


  get auth_module_title(){
    return this.page.locator('#loginFrame').contentFrame().getByRole('heading');
  }

  get usernameInput() {
    return this.page.locator('#loginFrame').contentFrame().getByRole('textbox', { name: loginForm["login_form_email"][this.lang] });
  }

  get passwordInput() {
    return this.page.locator('#loginFrame').contentFrame().getByRole('textbox', { name: loginForm["login_form_password"][this.lang] });
  }

  get loginButton() {
    return this.page.locator('#loginFrame').contentFrame().getByRole('button', { name: loginForm["login_form_button"][this.lang] });
  }

  get wrong_username_heading(){
    return this.page.locator('#loginFrame').contentFrame().getByRole('heading', { name: loginForm["wrong_username"][this.lang] });
  }

  get wrong_password_heading(){
    return this.page.locator('#loginFrame').contentFrame().getByRole('heading', { name: loginForm["wrong_password"][this.lang] });
  }

  get toggle_form_link(){
    return this.page.locator('#loginFrame').contentFrame().locator("#toggleForm");
  }



  async submitLoginForm(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }


  async switch_to_auth_form(){
    const currentForm = await this.auth_module_title.textContent();
    if(currentForm == loginForm["modalTitle_reg"][this.lang]){
      await this.toggle_form_link.click();
    }else if(currentForm == loginForm["modalTitle_login"][this.lang]){
      // do nothing
    }
  }

}
