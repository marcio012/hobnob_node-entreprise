import assert from 'assert';
import superagent from 'superagent';
import { When, Then } from 'cucumber';
import dotenv from 'dotenv';

dotenv.config();

// let request;
// let result;
// let error;
// let payload;

When('o cliente faz uma solicitação com o metodo POST /users', function () {
  this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/users`);
});

When('envia uma carga de dados vazia', function () {
  return undefined;
});

When('enviar uma solicitação', function (callback) {
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

Then('Api deve responder com um codigo 400 HTTP status code', function () {
  assert.equal(this.response.statusCode, 400);
});

Then('e a resposta da Api deve ser no formato de Json', function () {
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

Then('contendo a mensagem "Payload should not be empty"', function () {
  assert.equal(this.responsePayload.message, 'Payload should not be empty');
});
