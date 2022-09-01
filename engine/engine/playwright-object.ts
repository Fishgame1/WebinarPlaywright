import { Browser, BrowserContext, Page } from 'playwright-core';

export interface Initialization {
    playwrightBrowser?: Browser;
    browserContext?: BrowserContext;
    page?: Page;
    browserName?: string;
}

export class PlaywrightObject {
    browser?: Browser;
    context?: BrowserContext;
    browserName?: string;
    private playwrightPage?: Page;

    async init(init: Initialization) {
        if (this.browser) return;
        this.browser = init.playwrightBrowser;
        this.context = init.browserContext;
        this.playwrightPage = init.page;
    }

    async initNew(init: Initialization) {
        if (!init.playwrightBrowser) {
            throw new Error('Cannot start without browser');
        }
        this.browser = init.playwrightBrowser;
        this.browserName = init.browserName;
        this.context = await this.browser.newContext();
        this.playwrightPage = await this.browser.newPage();
    }

    async close() {
        await this.browser.close();
        this.browser = undefined
    }

    async initAll(init: Initialization) {
        if (!init.playwrightBrowser) {
            throw new Error('Cannot start without browser');
        }
        if (this.browser) return;
        this.browser = init.playwrightBrowser;
        this.browserName = init.browserName;
        this.context = await this.browser.newContext();
        this.playwrightPage = await this.browser.newPage();
    }

    async open(url: string) {
        if (!this.page) {
            throw new Error('Cannot open page without context');
        }
        await this.page().goto(url);
    }

    page() {
        if (!this.playwrightPage) {
            throw new Error('Please initialize page first using init() method in Playwright');
        }
        return this.playwrightPage;
    }
}

export default new PlaywrightObject();
