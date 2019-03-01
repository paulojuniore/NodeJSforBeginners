const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this._db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const { nome, skip, limit } = request.query

                    let query = {}
                    if(nome) {
                        query.nome = nome
                    }

                    if (isNaN(skip)) 
                        throw Error('O skip é inválido!')
                    if (isNaN(limit))
                        throw Error('O limit é inválido!')
                    
                    return this._db.read(query, parseInt(skip), parseInt(limit))
                } catch (error) {
                    console.log('ERRO!', error)
                    return 'Erro interno no servidor!'
                }
            }
        }
    }
}

module.exports = HeroRoutes