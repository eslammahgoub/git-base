import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';
import { fillMaterialFieldById } from './utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    // clear the storage
    browser.executeScript("try {localStorage.clear();} catch(exception) {}");
    page = new AppPage();
  });

  it('should have a logo with name GIT-BASE', async () => {
    await page.navigateTo();
    expect(await page.getLogoText()).toEqual('GIT-BASE');
  });

  // it('should have a logo with src assets/logo.png', async () => {
  //   await page.navigateTo();
  //   expect((await page.getLogoSrc()).includes('assets/logo.png')).toBeTruthy();
  // });

  it('should enable to search by text and view the list of items', async () => {
    await page.navigateTo();
    await fillMaterialFieldById("search-input", "Angular");
    await element(by.css('mat-option')).click();
    expect(await page.isRepoListPresent()).toBeTruthy();
  });

  it('should after search should paginator exist', async () => {
    await page.navigateTo();
    await fillMaterialFieldById("search-input", "Angular");
    await element(by.css('mat-option')).click();
    expect(await page.isPaginatorPresent()).toBeTruthy();
  });

  it('should when click on the name it will open the repo item component', async () => {
    await page.navigateTo();
    await fillMaterialFieldById("search-input", "Angular");
    await element(by.css('mat-option')).click();
    // @Note: it should return list of elements but it'll automatically click on the first result so the test will be pass
    await element(by.css('.mat-line.link--normal')).click();
    expect(await page.isRepoItemComponentPresent()).toBeTruthy();
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
