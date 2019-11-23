import Assert from 'assert';
import superagent from 'superagent';
import { When, Then } from 'cucumber';

When('o cliente faz uma solicitação com o metodo POST /users', () => {
  this.request = superagent('POST', `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/users`);
});

When('envia uma carga de dados vazia', () => undefined);

When('enviar uma solicitação', (callback) => {
  this.request
    .then((response) => {
      this.response = response.res;
      callback();
    })
    .catch((error) => {
      this.response = error.response;
      callback();
    });
});

Then('Api deve responder com um codigo 400 HTTP status code', () => {
  if (this.response.statusCode !== 400) {
    throw new Assert.AssertionError({
      expected: 400,
      actual: this.response.statusCode,
    });
  }
});

Then('e a resposta da Api deve ser no formato de Json', () => {
  const contentType = this.response.headers['Content-type'] || this.response.headers['content-type'];
  if (!contentType || !contentType.includes('appication/json')) {
    throw new Error('Response not of Content-Type application/json');
  }
  // check it is valid json
  try {
    this.responsePayload = JSON.parse(this.response.text);
  } catch (error) {
    throw new Error('Response not a valid JSON object');
  }
});

Then('contendo a mensagem "Payload should not be empty"', () => {
  if (this.responsePayload.message !== 'Payload should not be empty') {
    throw new Error();
  }
});
