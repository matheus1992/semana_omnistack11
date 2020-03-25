const connection = require('./../database/connection');

module.exports = {
    async index (request, response){
        const ong_id = request.headers.authorization;

        const casos = await connection('casos').select('*')
        .where('ong_id', ong_id);
        
        return response.json(casos);
    },
}