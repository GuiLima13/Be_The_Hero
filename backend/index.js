const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./Router/router');

//Serve para especificar quem pode acessar a aplicação, ou seja passando o dominio
// da seguinte forma { origin: 'http://meuapp.com' }
app.use(cors());

app.use(express.json());
app.use(router);

app.listen(3333);