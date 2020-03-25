const connection = require('./../database/connection');

module.exports = {
    async create(request, response){
        const { id } = request.body;

        const ong = await connection('ongs').where('id', id)
        .select('nome').first();

        if(!ong){
            return response.status(400).json({error: "Nenhuma ONG encontrada com este ID."});
        }
        
        return response.json(ong);
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await connection('casos').where('id', id)
        .select('ong_id').first();

        if (caso.ong_id != ong_id){
            return response.status(401).json({error: 'Operação não permitida.'});
        }

        await connection('casos').where('id', id).delete();
        return response.status(204).send();
    },
}