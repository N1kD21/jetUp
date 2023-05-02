'use strict';

const fetch    = require('node-fetch');
const jsdom    = require('jsdom');
const { JSDOM } = jsdom;

//take text from html element
function getTextFromHtml(array) {
  const res = [];
  array.forEach((e, i) => {
    res[i] = e.textContent;
  });
  return res;
}

async function getList(url) {

  //get doc structure of site
  const htmlUAFootball  = await fetch(url)
    .then((res) => res.text())
    .then((body) => body)
    .catch((err) => console.log(err));
  const document = (new JSDOM(`${htmlUAFootball}`)).window.document;

  //get data about team by class names
  const name = getTextFromHtml(document.querySelectorAll('.user-name.js-anim-h2'));
  const position = getTextFromHtml(document.querySelectorAll('.position.js-anim-h3'));
  const userText = getTextFromHtml(document.querySelectorAll('.user-text.js-anim-text'));
  const arrImg   = document.querySelectorAll('.text-block-item');
  const photo = [];
  arrImg.forEach((e) => {
    photo.push(`https://jetup.digital/${e.getAttribute('data-image')}`);
  });
  return {
    name,
    position,
    userText,
    photo
  };
}

module.exports = getList;
