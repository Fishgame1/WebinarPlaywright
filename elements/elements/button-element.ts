import { BaseElement } from './base-element';


export class ButtonElement extends BaseElement {

    constructor(selector: string) {
        super(selector);
    }
}

export function getButtonElement(selector: string): ButtonElement {
    return new ButtonElement(selector);
}