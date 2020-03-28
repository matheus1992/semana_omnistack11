const crypto = require('crypto');
const connection = require('./../database/connection');
const generateUniqueId = require('../utils/generateUniqueid');

module.exports = {
    async index (request, response){
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response){
        const { nome, email, whatsapp, cidade, uf } = request.body;

        const id = generateUniqueId();
    
        await connection('ongs').insert({
            id, nome, email, whatsapp, cidade, uf
        });
        
        return response.json({id});
    }
}