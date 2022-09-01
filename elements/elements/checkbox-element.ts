import { BaseElement } from './base-element';


export class CheckboxElement extends BaseElement {

    constructor(selector: string) {
        super(selector);
    }

    async check() {
        await this.element().check()
    }
}

export function getCheckboxElement(selector: string): CheckboxElement {
    return new CheckboxElement(selector);
}