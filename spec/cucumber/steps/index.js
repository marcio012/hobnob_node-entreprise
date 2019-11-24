import assert from 'assert';
import superagent from 'superagent';
import { When, Then } from 'cucumber';
import dotenv from 'dotenv';

dotenv.config();

When(/^o cliente faz uma solicitação com o metodo POST \/users$/, function () {
  this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/users`);
});

When(/^envia uma carga de dados vazia$/, function () {
  return undefined;
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

Then(/^Api deve responder com um codigo HTTP status code 400$/, function () {
  assert.equal(this.response.statusCode, 400);
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

Then(/^contendo a mensagem 'Payload should not be empty'$/, function () {
  assert.equal(this.responsePayload.message, 'Payload should not be empty');
});

When(/^envia uma carga em um padrão difente de Json$/, function () {
  this.request.send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>');
  this.request.set('Content-Type', 'text/xml');
});

When(/^anexa uma carga útil no padrão Json malformada$/, function () {
  this.request.send('{"email": "dan@danyll.com", name: }');
  this.request.set('Content-Type', 'application/json');
});

Then(/^Api deve responder com um codigo HTTP status code 415$/, function () {
  assert.equal(this.response.statusCode, 415);
});

Then(/^contém a mensagem 'The "Content-Type" header must always be "application\/json"'$/, function () {
  assert.equal(this.responsePayload.message, 'The "Content-Type" header must always be "application/json"');
});

Then(/^contém a mensagem 'Payload should be in JSON format'$/, function () {
  assert.equal(this.responsePayload.message, 'Payload should be in JSON format');
});
