import { element, by } from 'protractor';

/**
 * fillInput with any text
 * @param el nativeElement
 * @param text string
 */
export async function fillInput(el: any, text: string) {
    await el.click()
    await el.clear();
    await el.sendKeys(text);
}


/**
 * fillMaterialField
 * @description to fill Material Field by Id
 * @param id string of id
 * @param text string of text to fill
 */
export async function fillMaterialFieldById(id: string, text: string) {
    const selector = by.css(`#${id}`);
    const el = element(selector);
    expect(await el.isPresent()).toBe(true);
    await fillInput(el, text);
}
