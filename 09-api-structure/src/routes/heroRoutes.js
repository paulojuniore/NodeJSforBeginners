const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

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
                    return Boom.internal()
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
                        id: result._id
                    }
                } catch (error) {
                    console.log('Erro ao cadastrar!', error)
                    return Boom.internal()
                }
            }
        }
    }

    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(5).max(50),
                        poder: Joi.string().min(5).max(50)
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { id } = request.params
                    const { payload } = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)

                    const result = await this._db.update(id, dados)
                    
                    // console.log('result', result)
                    if(result.nModified !== 1) {
                        return Boom.preconditionFailed('id não encontrado no banco!')
                    }

                    return {
                        message: 'Herói atualizado com sucesso!'
                    }
                } catch (error) {
                    console.log('Erro ao atualizar!')
                    return Boom.internal()
                }
            }
        }
    }

    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request, headers) => {
                try {
                    const { id } = request.params
                    const result = await this._db.delete(id)
                    
                    if(result.deletedCount !== 1) {
                        return Boom.preconditionFailed('id não encontrado no banco!')
                    }
                    return {
                        message: 'Herói removido com sucesso!'
                    }
                } catch (error) {
                    console.log('Falha ao remover herói!')
                    return Boom.internal()
                }
            }
        }
    }
}

module.exports = HeroRoutes