const next = require('next');
const express = require('express');

const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;

const app = express();
const nextApp = next({ dev: DEV });
const handle = nextApp.getRequestHandler();

app.enable('trust proxy');
app.use((request, response, next) => {
  if (process.env.NODE_ENV != 'development' && !request.secure) {
    return response.redirect(`https://${request.headers.host}${request.url}`);
  }
  next();
});
nextApp.prepare().then(() => {
  app.get('*', (req, res) => handle(req, res));
  app.listen(PORT, () => {
    console.info('Server running at port: ' + PORT);
  });
});
