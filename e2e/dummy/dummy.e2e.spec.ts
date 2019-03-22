import { name } from 'faker';

describe('end to end: Dummy', () => {
  beforeEach(async () => page.goto('http://localhost:4200'));

  it('Should see the text typed prefixed by hello in the title', async () => {
    const testName: string = name.firstName();

    return page
      .waitForSelector('.title')
      .then(async () => page.click('input[name=userName]'))
      .then(async () => page.type('input[name=userName]', testName))
      .then(async () => page.$eval('.title', (element: Element) => element.innerHTML))
      .then((text: string) => expect(text).toBe(`Hello ${testName}!!`));
  });
});
