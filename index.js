// eslint-disable-next-line no-console
const express = require('express');
const routerApi = require('./routes/index');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

app.use(cors()); // Habilitamos a cualquier dominio a consumir la API

// Sirve para recibir informacion json, que nos envian por POST
app.use(express.json());

routerApi(app);
// Importa mucho el orden de los middleWares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  let message = 'Hola, este es mi server en Express.';
  let message2 = 'Estas son las rutas de la api en las que puedes acceder: ';
  let message3 = ' -- /api/v1/categories';
  let message4 = ' -- /api/v1/users';
  let message5 = ' -- /api/v1/products';
  res.send(message + message2 + message3 + message4 + message5);
});

app.listen(port);
