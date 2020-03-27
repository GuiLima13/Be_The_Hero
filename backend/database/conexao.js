const knex = require('knex');
const configuracoes = require('../knexfile');

const conexao = knex(configuracoes.development);

module.exports = conexao;