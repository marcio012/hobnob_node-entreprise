import { When, Then } from 'cucumber';

When('o cliente faz uma solicitação com o metodo POST /users', (callback) => {
  callback(null, 'pending');
});

When('envia uma carga de dados vazia', (callback) => {
  callback(null, 'pending');
});

When('enviar uma solicitação', (callback) => {
  callback(null, 'pending');
});

Then('Api deve responder com um codigo 400 HTTP status', (callback) => {
  callback(null, 'pending');
});

Then('e a resposta da Api deve ser no formato de Json', (callback) => {
  callback(null, 'pending');
});

Then('contendo a mensagem "Payload should not be empty"', (callback) => {
  callback(null, 'pending');
});
