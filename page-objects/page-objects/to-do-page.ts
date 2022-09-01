import { InputElement } from '../elements/input-element';
import { TextElement } from '../elements/text-element';
import { getConfig } from '../engine/config';
import { Keys } from '../engine/keys';
import playwrightObject from '../engine/playwright-object';
import { ToDoEntity } from '../entities/to-do-entity';
import { BasePage } from './base-page';
import { ToDoListElement } from './elements/to-do-list-element';
import { FooterElement } from './elements/to-do-list-footer';

const baseSelector = '.todoapp'
const translation = () => getConfig().translations

export class ToDoPage extends BasePage {

    readonly descriptionText: TextElement;
    readonly toDoText: TextElement;
    readonly toDoInput: InputElement
    readonly footerELement: FooterElement

    constructor(
        private url: string = 'https://demo.playwright.dev/todomvc',
        tabName: string = 'React • TodoMVC'
    ) {
        super(url, tabName, baseSelector);
        let texts = translation()
        this.descriptionText = new TextElement('body > div', texts.toDoDescription);
        this.toDoText = new TextElement('h1', texts.toDoHeader);
        this.toDoInput = new InputElement('.new-todo');
        this.footerELement = new FooterElement()
    }

    async open(): Promise<void> {
        await playwrightObject.open(this.url)
        await this.shouldBeOpened()
    }

    async validatePageWithoutTask() {
        await this.validateStaticElements()
        await this.footerELement.shouldBeHidden()
    }

    async validatePageWithTasks(toDoEntities: ToDoEntity[]) {
        await this.validateStaticElements()
        await this.footerELement.validateComponent(toDoEntities.length)
        await this.validateTasks(toDoEntities)
    }

    async addToDo(toDoEntity: ToDoEntity) {
        await this.toDoInput.fill(toDoEntity.taskName)
        await playwrightObject.page().locator(this.toDoInput.selector).press(Keys.ENTER)
    }

    async finishTask(toDoEntity: ToDoEntity) {
        toDoEntity.isCompleted = true
        return toDoEntity
    }

    async validateTasks(toDoEntities: ToDoEntity[]) {
        for (const [index, toDoEntity] of toDoEntities.entries()) {
            await new ToDoListElement(index + 1).validateElement(toDoEntity)
        }
        // foreach is not working with async so don't use code below ever in your project: https://stackoverflow.com/questions/68026591/what-is-the-difference-between-async-await-foreach-and-promise-all-map
        // toDoEntities.forEach(async (entity, index) => await new ToDoListElement(index + 1).validateElement(entity))
    }
    
    private async validateStaticElements() {
        await this.descriptionText.validateText()
        await this.toDoText.validateText()
    }
}