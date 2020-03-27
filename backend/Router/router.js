const express = require('express');
const router = express.Router();
const ongsController = require('../Controller/ongsController');
const casoController = require('../Controller/casoController');
const perfilController = require('../Controller/perfilController');
const sessaoController = require('../Controller/sessaoController');

router.post('/login',sessaoController.login);

router.post('/ongs',ongsController.cadastrar);
router.get('/ongs',ongsController.listar);

router.get('/perfil',perfilController.buscar);

router.post('/caso',casoController.cadastrar);
router.get('/caso',casoController.listar);
router.delete('/caso/:id',casoController.deletar);



module.exports = router;