'use strict';

const isHeadless = process.env.HEADLESS === 'true';

module.exports = {
  launch: {
    dumpio: !isHeadless,
    headless: isHeadless,
    timeout: 100000,
  },
}
