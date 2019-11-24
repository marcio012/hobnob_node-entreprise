import assert from 'assert';
import superagent from 'superagent';
import { When, Then } from 'cucumber';
import dotenv from 'dotenv';

dotenv.config();

When(/^o cliente faz uma solicitação com o metodo (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) para ([/\w-:.]+)$/, function (method, path) {
  this.request = superagent(method, `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}${path}`);
});

When(/^envia uma carga (.+) generica$/, function (payloadType) {
  switch (payloadType) {
    case 'malformed':
      this.request
        .send('{"email": "dan@danyll.com", name: }')
        .set('Content-Type', 'application/json');
      break;
    case 'non-JSON':
      this.request
        .send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>')
        .set('Content-Type', 'text/xml');
      break;
    case 'empty':
    default:
  }
});

When(/^enviar uma solicitação$/, function (callback) {
  this.request
    .then((response) => {
      // this.response = response.res;
      this.response = response.res;
      callback();
    })
    .catch((error) => {
      this.response = error.response;
      callback();
    });
});

Then(/^Api deve responder com um codigo HTTP status code ([1-5]\d{2})$/, function (statusCode) {
  assert.equal(this.response.statusCode, statusCode);
});

Then(/^e a resposta da Api deve ser no formato de Json$/, function () {
  const contentType = this.response.headers['Content-type'] || this.response.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response not of Content-Type application/json');
  }
  // check it is valid json
  try {
    this.responsePayload = JSON.parse(this.response.text);
  } catch (e) {
    throw new Error('Response not a valid JSON object');
  }
});

Then(/^contendo a mensagem (?:"|')(.*)(?:"|')$/, function (message) {
  assert.equal(this.responsePayload.message, message);
});
