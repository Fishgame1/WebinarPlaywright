import { expect, Locator } from '@playwright/test';
import playwrightObject from '../engine/playwright-object';

export interface ShouldBeEnabledParameters {
    shouldBeEnabled?: boolean;
    byAttribute?: boolean;
}

export abstract class BaseElement {

    constructor(public selector: string) {}

    element(): Locator {
        return playwrightObject.page().locator(this.selector);
    }

    public async toBeVisible() {
        await this.element().waitFor({ state: 'visible' });
    }

    public async toBeHidden() {
        await this.element().waitFor({ state: 'hidden' });
    }

    public async toHaveText(text: string) {
        await expect(this.element()).toHaveText(text);
    }

    public async toBeEnabled() {
        await expect(this.element()).toBeEnabled();
    }

    public async toBeDisabled() {
        await expect(this.element()).toBeDisabled();
    }

    async click() {
        return await this.element().click();
    }

    async doubleClick() {
        return await this.element().dblclick();
    }
    
    async press(key: string) {
        return await this.element().press(key);
    }
}
