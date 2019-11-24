Feature: Create User

  Os clientes devem poder enviar uma solicitação à nossa API para criar um 
  usuário. Nossa API também deve validar os dados e responder com um erro
  se estiverem inválidos ou fora de padrão.

  Scenario Outline: Carga Util vazia

  Quando o cliente enviar uma solicitação POST para /users com uma carga útil vazia, deverá receber uma resposta com um status code 4xx. 

  When o cliente faz uma solicitação com o metodo POST para /users

  And envia uma carga <payloadType> generica

  And enviar uma solicitação

  Then Api deve responder com um codigo HTTP status code <statusCode>

  And e a resposta da Api deve ser no formato de Json

  And contendo a mensagem <mensagem>

  Examples:
  | payloadType | statusCode | mensagem                                                       |
  | empty       | 400        | "Payload should not be empty"                                  |
  | non-JSON    | 415        | 'The "Content-Type" header must always be "application/json"'  |
  | malformed   | 400        | "Payload should be in JSON format"                             |

