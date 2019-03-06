import { name } from 'faker';

describe('end to end: Dummy', () => {

  beforeEach(async () => page.goto('http://localhost:4200'));

  it('Should load the page correctly', async () => {
    const testName: string = name.firstName();

    return page.waitForSelector('.title')
      .then(() => page.click('input[name=userName]'))
      .then(() => page.type('input[name=userName]', testName))
      .then(() => page.$eval('.title', (element: Element) => element.innerHTML))
      .then((text: string) => expect(text).toBe(`Hello ${testName}!!`));
  });

});
