import '@babel/polyfill';
import http from 'http';

const requestHandler = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World, eslint fun fun!!!');
};

const server = http.createServer(requestHandler);
server.listen(3000);
