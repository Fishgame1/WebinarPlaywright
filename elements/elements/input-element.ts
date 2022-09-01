import { expect } from '@playwright/test';
import { BaseElement } from './base-element';


export class InputElement extends BaseElement {

    constructor(selector: string) {
        super(selector);
    }

    async fill(value: string, options?: {force?: boolean; noWaitAfter?: boolean; timeout?: number;}) {
        await this.element().fill(value, options);
    }

    async checkValue(value: string) {
        await expect(this.element()).toHaveValue(value);
    }
}

export function getInputElement(selector: string): InputElement {
    return new InputElement(selector);
}