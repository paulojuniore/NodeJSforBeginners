const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this._db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // payload -> body da requisição
                    // headers -> header
                    // params -> na url {id:}
                    // query -> skip=0?limit=10
                    failAction: (request, headers, erro) => {
                        throw erro
                    },
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(50)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { nome, skip, limit } = request.query

                    const query = nome ? {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    } : {}

                    return this._db.read(query, skip, limit)
                } catch (error) {
                    console.log('ERRO!', error)
                    return 'Erro interno no servidor!'
                }
            }
        }
    }
}

module.exports = HeroRoutes