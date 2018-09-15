
const express = require('express');
const next = require('next');
const api = require('./api');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const server = express();

  server.use(api());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, '0.0.0.0', err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});