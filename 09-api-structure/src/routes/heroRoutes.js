const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

const failAction = (request, headers, erro) => {
    throw erro
}

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
                    failAction, 
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

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().required().min(5).max(50),
                        poder: Joi.string().required().min(5).max(50)
                    }
                }
            },
            handler: async (request, headers) => {
                try { 
                    const { nome, poder } = request.payload
                    const result = await this._db.create({ nome, poder })
                    return {
                        message: 'Herói cadastrado com sucesso!',
                        _id: result._id
                    }
                } catch (error) {
                    console.log('Erro ao cadastrar!', error)
                    return 'Erro interno ao cadastrar!'
                }
            }
        }
    }
}

module.exports = HeroRoutes