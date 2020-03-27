const conexao = require('../database/conexao');
const perfilController = {
    buscar: async (req,res)=>{
        const ong_id = req.headers.ong_id;
        const casos = await conexao('incident')
            .where('ong_id',ong_id)
            .select('*');
        return res.json({casos});
    }
}

module.exports = perfilController;