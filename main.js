'use strict';

const url = 'https://jetup.digital/team';
const parseList = require('./lib/parseList.js');
const insertInDb = require('./lib/db.js').insertInDb;

(async () => {
  insertInDb(await parseList(url));
})();

require('./lib/server.js');

