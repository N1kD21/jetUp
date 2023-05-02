'use strict';

const http = require('http');
const url = require('url');
const query = require('./db.js').query;

async function routing(link) {
  const objLink = url.parse(link);
  const arrLink = objLink.path.split('/');
  let data;
  switch (arrLink[1]) {
  case 'favicon.ico':
    return;
  case 'name':
    data = await query(arrLink[1], arrLink[2]);
    return data;
  case 'position':
    data = await query(arrLink[1], arrLink[2]);
    return data;
  default:
    return 'Wrong question. You can only search by position and name';
  }
}

const types = {
  object: ([data], callback) => callback(JSON.stringify(data)),
  undefined: (args, callback) => callback('not found'),
  function: ([fn, req, res], callback) => {
    if (fn.length === 3) fn(req, res, callback);
    else callback(JSON.stringify(fn(req, res)));
  },
};

const serve = (data, req, res) => {
  const type = typeof data;
  if (type === 'string') return res.end(data);
  const serializer = types[type];
  serializer([data, req, res], (data) => serve(data, req, res));
};

http.createServer(async (req, res) => {
  const data = await routing(req.url);
  serve(data, req, res);
}).listen(8000);
