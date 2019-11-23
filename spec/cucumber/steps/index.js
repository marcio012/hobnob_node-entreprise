import { When, Then } from 'cucumber';

When('o cliente cria uma solicitação POST para /users', (callback) => {
  callback(null, 'pending');
});

Then('our API should respond with a 400 HTTP status code', (callback) => {
  callback(null, 'pending');
});
