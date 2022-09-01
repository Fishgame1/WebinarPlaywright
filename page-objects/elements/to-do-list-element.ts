import { expect } from '@playwright/test';
import { Keys } from '../../engine/keys';
import { ToDoEntity } from '../../entities/to-do-entity';
import { BaseElement } from '../../elements/base-element';
import { ButtonElement, getButtonElement } from '../../elements/button-element';
import { CheckboxElement, getCheckboxElement } from '../../elements/checkbox-element';
import { DynamicTextElement, getDynamicTextElement } from '../../elements/dynamic-text-element';
import { getInputElement, InputElement } from '../../elements/input-element';

let baseSelector = '.todo-list li'

export class ToDoListElement extends BaseElement {

    readonly checkboxElement: CheckboxElement
    readonly label: DynamicTextElement
    readonly input: InputElement
    readonly destroyButton: ButtonElement

    constructor(index: number) {
        super(`${baseSelector}:nth-child(${index})`)
        this.checkboxElement = getCheckboxElement(`${this.selector} .toggle`)
        this.label = getDynamicTextElement(`${this.selector} label`)
        this.input = getInputElement(`${this.selector} input.edit`)
        this.destroyButton = getButtonElement(`${this.selector} button`)
    }

    async markAsComplete() {
        await this.checkboxElement.check()
    }

    async validateElement(entity: ToDoEntity) {
        await this.checkboxElement.toBeVisible()
        await this.checkboxElement.toBeEnabled()
        await this.label.validateText(entity.taskName)
        await this.input.toBeHidden()
        await this.destroyButton.toBeHidden()
        if (entity.isCompleted) {
            await expect(this.element()).toHaveClass('completed');
        } else {
            await expect(this.element()).toHaveClass('');
        }
    }

    async changeLabel(entity: ToDoEntity, odlEntity?: ToDoEntity) {
        await this.label.doubleClick()
        if (odlEntity) {
            await this.input.checkValue(odlEntity.taskName)
        }
        await this.input.fill(entity.taskName)
        await this.input.press(Keys.ENTER)
    }
}