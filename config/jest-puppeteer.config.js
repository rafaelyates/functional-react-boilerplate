'use strict';

const isHeadless = process.env.JEST_HEADLESS === 'true';

module.exports = {
  launch: {
    dumpio: !isHeadless,
    headless: isHeadless,
    timeout: 100000,
  },
}
