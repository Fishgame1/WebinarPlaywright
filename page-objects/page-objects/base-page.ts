import { expect, Frame } from '@playwright/test';
import playwrightObject from '../engine/playwright-object';


export abstract class BasePage {
    protected constructor(protected partialUrl?: string, protected tabName?: string, public pageSelector?: string) {}

    async openUrl(url: string) {
        await playwrightObject.open(url);
    }
    
    async shouldBeOpened() {
        await this.waitForLoadState('networkidle');
        await this.waitForLoadState('domcontentloaded');
        if (this.pageSelector) {
            await this.waitForPageSelector();
        }
        if (this.partialUrl) {
            await this.validateUrl();
        }
        if (this.tabName) {
            await this.validateTabName();
        }
    }

    async waitForUrl(url: string) {
        await playwrightObject.page().waitForURL(url);
    }

    async waitForLoadState(state?: "load"|"domcontentloaded"|"networkidle", options?: { timeout?: number }) {
        await playwrightObject.page().waitForLoadState(state);
    }

    async waitForPageSelector() {
        if (!this.pageSelector) {
            throw new Error("You need to specify page selector to be a");
        }
        await playwrightObject.page().waitForSelector(this.pageSelector);
    }

    async validateUrl() {
        if (!this.partialUrl) {
            throw new Error("Can't checkUrl because uri is not specified");
        }
        await playwrightObject.page().waitForURL(this.partialUrl);
    }

    async validateTabName() {
        if (!this.tabName) {
            throw new Error("Can't checkTitle because title is not specified");
        }
        const actualTitle = await playwrightObject.page().title();
        expect(actualTitle).toEqual(this.tabName);
    }
}
