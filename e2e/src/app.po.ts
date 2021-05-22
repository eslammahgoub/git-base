import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getLogoText(): Promise<string> {
    return element(by.css('gitbase-logo div a')).getText();
  }

  async getLogoSrc(): Promise<string> {
    return element(by.css('gitbase-logo div img')).getAttribute('src');
  }

  async clickOnSearchButton(): Promise<void> {
    await element(by.css('button.search-btn')).click();
  }

  async isRepoListPresent(): Promise<boolean> {
    return element(by.css('mat-list.repo-list')).isPresent();
  }

  async isPaginatorPresent(): Promise<boolean> {
    return element(by.css('mat-paginator')).isPresent();
  }

  async isRepoItemComponentPresent(): Promise<boolean> {
    return element(by.css('gitbase-repo-item')).isPresent();
  }
}
