import { BaseElement } from './base-element';


export class DynamicTextElement extends BaseElement {

    constructor(selector: string) {
        super(selector);
    }

    async validateText(text: string) {
        await this.toHaveText(text);
    }
}

export function getDynamicTextElement(selector: string): DynamicTextElement {
    return new DynamicTextElement(selector);
}