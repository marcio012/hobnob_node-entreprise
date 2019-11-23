import Assert from 'assert';
import superagent from 'superagent';
import { When, Then } from 'cucumber';

let request;
let result;
let error;
let payload;

When('o cliente faz uma solicitação com o metodo POST /users', () => {
  request = superagent('POST', 'localhost:3000/users');
});

When('envia uma carga de dados vazia', () => undefined);

When('enviar uma solicitação', (callback) => {
  request
    .then((response) => {
      // this.response = response.res;
      result = response.res;
      callback();
    })
    .catch((errResponse) => {
      error = errResponse.response;
      callback();
    });
});

Then('Api deve responder com um codigo 400 HTTP status code', () => {
  if (error.statusCode !== 400) {
    throw new Error();
  }
});

Then('e a resposta da Api deve ser no formato de Json', () => {
  const response = result || error;
  const contentType = response.headers['Content-type'] || response.headers['content-type'];
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response not of Content-Type application/json');
  }
  // check it is valid json
  try {
    payload = JSON.parse(response.text);
  } catch (e) {
    throw new Error('Response not a valid JSON object');
  }
});

Then('contendo a mensagem "Payload should not be empty"', () => {
  if (payload.message !== 'Payload should not be empty') {
    throw new Error();
  }
});
