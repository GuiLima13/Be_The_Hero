const conexao = require('../database/conexao');

const sessaoController = {
    login: async  (req,res)=>{
        const {id} = req.body;

        const ong = await conexao('ongs')
            .where('id',id)
            .select('nome')
            .first();
        if(!ong){
            return res.status(400).json({error: 'ONG não foi encontrada'})
        }
        return res.json({ong});
    }   
}

module.exports = sessaoController;