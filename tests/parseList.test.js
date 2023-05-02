/* eslint-disable no-undef */
'use strict';

const response = require('../lib/parseList.js');
const url = 'https://jetup.digital/team';

test('the data is peanut butter', async () => {
  const result = await response(url);
  console.log(typeof result.position.length);
  expect(result.name).toHaveLength(result.position.length);
  expect(result.name).toHaveLength(result.userText.length);
  expect(result.position).toHaveLength(result.userText.length);
});

