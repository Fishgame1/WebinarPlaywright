import { BaseElement } from './base-element';


export class TextElement extends BaseElement {

    constructor(selector: string, public text: string) {
        super(selector);
    }

    async validateText() {
        await this.toHaveText(this.text);
    }
}

export function getTextElement(selector: string, text: string): TextElement {
    return new TextElement(selector, text);
}