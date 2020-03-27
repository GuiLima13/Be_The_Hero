const crypto = require('crypto');
const conexao = require('../database/conexao');
const casoController = 
    {
    cadastrar: async (req,res)=>{
        const {titulo, descricao, valor} = req.body;
        const ong_id = req.headers.ong_id;

        const [id] = await conexao('incident').insert({
            titulo, 
            descricao, 
            valor,
            ong_id
        })
        return res.json({id});
    },

    listar: async (req,res)=>{
    const {pag = 1} = req.query;

    const count = await conexao('incident')
    .count();    

    const caso = await conexao('incident')
    //Fazendo um join na tabela ongs, para trazer os dados da ong que criou esse caso
    .join('ongs','ongs.id','=','incident.ong_id')
    //Fazendo esquema de paginação, onde ele vai mostrar 5 casos por pagina
    .limit(5)
    .offset((pag -1)*5)
    //Especificando no select, que vou trazer todos os dados da tabela
    // incident, porem so alguns da tabela ongs
    .select([
            'incident.*',
            'ongs.nome',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.cidade',
            'ongs.uf']);
    
    //Era para enviar para o header da response o total de casos cadastrado
    res.header('X-Total-Count', count['count(*)']);

    return res.json({caso});
    },

    deletar: async (req,res)=>{
        //buscando numero do caso passado pela url utilizando metodo Get 
        const {id} = req.params;
        //Buscando o usuario logado que foi passado atraves do header
        const ong_id = req.headers.ong_id;
                //Buscando no banco o caso com o id passado pela url, 
        //e buscando dessa consulta apenas o id da ong
        const incident = await conexao('incident')
            .where('id',id)
            .select('ong_id')
            .first();
        
        


        //comparando se id buscado no header é igual ao resultado da consulta
        if(incident.ong_id != ong_id){
            //Retornando mensagem de erro
            return res.status(401).json({error:'Operação nao permitida'})
        }
        //Query para deletar do banco
        await conexao('incident').where('id',id).delete();
        //Retornando codigo de sucesso
        return res.status(204).send();
            
    }
};

module.exports = casoController;