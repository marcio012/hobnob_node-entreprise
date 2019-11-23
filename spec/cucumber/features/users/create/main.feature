Feature: Create User

  Os clientes devem poder enviar uma solicitação à nossa API para criar um 
  usuário. Nossa API também deve validar a estrutura da carga útil e responder 
  com um erro se for inválido.

   #Clients should be able to send a request to our API in order to create a user. 
   #Our API should also validate the structure of the payload and respond with an
   #error if it is invalid.

#TODO: Os clientes devem poder enviar uma solicitação à nossa API para criar um usuário. Nossa API também deve validar a estrutura da carga útil e responder com um erro se for inválido.

  # Scenario: Empty Payload
  Scenario: Carga Util vazia

  Quando o cliente enviar uma solicitação POST para /usuários com uma carga útil não suportada,
  deverá receber uma resposta com um 4xx status code. 

  # If cliente enviar uma solicitação POST para /users com uma carga útil não suportada, it
  # should receber uma resposta com um 4xx status code. 

  #When the client creates a POST request to /users
  When o cliente faz uma solicitação com o metodo POST /users
  #And attaches a generic empty payload
  And envia uma carga de dados vazia
  #And sends the request
  And enviar uma solicitação
  #Then our API should respond with a 400 HTTP status code
  Then Api deve responder com um codigo 400 HTTP status code 
  #And the payload of the response should be a JSON object
  And e a resposta da Api deve ser no formato de Json
  #And contains a message property which says "Payload should not be empty"
  And contendo a mensagem "Payload should not be empty"
  