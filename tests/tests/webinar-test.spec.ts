import playwrightObject from '../engine/playwright-object';
import { test } from '../engine/test-runner';
import { ToDoEntity } from '../entities/to-do-entity';
import { ToDoPage } from '../page-objects/to-do-page';
import { getRandomString } from '../random/random-string-generator';


let firstTask: ToDoEntity = {taskName: 'Make a webinar', isCompleted: false}
let secondTask: ToDoEntity = {taskName: getRandomString(10), isCompleted: false}

test.describe('Check toDo page', () => {

  test.afterEach(async () => {
    await playwrightObject.page().close()
  });

  let basePage = new ToDoPage()

  for (let index of [1,2,3]) {
          test(`Check task ${index}`, async ({ initNew }) => {
        // When
        await basePage.open()
        let tasks = [firstTask, secondTask]
        for (let task of tasks) {
          await basePage.addToDo(task)
        }

        // Then
        await basePage.validatePageWithTasks(tasks)
      });
  }
});
