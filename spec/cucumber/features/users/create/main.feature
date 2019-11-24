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
  Then Api deve responder com um codigo HTTP status code 400
  #And the payload of the response should be a JSON object
  And e a resposta da Api deve ser no formato de Json
  #And contains a message property which says "Payload should not be empty"
  And contendo a mensagem 'Payload should not be empty'


  Scenario: Carga Util em padrão diferente de Json

  Se o cliente enviar uma solicitação POST para /users com uma carga útil que 
  não seja JSON, deverá receber uma resposta com um codigo de status HTTP 415.
  Tipo de mídia não suportado.

  When o cliente faz uma solicitação com o metodo POST /users
  And envia uma carga em um padrão difente de Json
  And enviar uma solicitação
  Then Api deve responder com um codigo HTTP status code 415
  And e a resposta da Api deve ser no formato de Json
  And contém a mensagem 'The "Content-Type" header must always be "application/json"'



  Scenario: Carga Json fora do padrão

  Se o cliente enviar uma solicitação POST para /users com uma carga útil que seja mal formado, deve receber uma resposta com um código de status HTTP 400.
  Tipo de mídia não suportado.

  When o cliente faz uma solicitação com o metodo POST /users
  And anexa uma carga útil no padrão Json malformada
  And enviar uma solicitação
  Then Api deve responder com um codigo HTTP status code 400
  And e a resposta da Api deve ser no formato de Json
  And contém a mensagem 'Payload should be in JSON format'
