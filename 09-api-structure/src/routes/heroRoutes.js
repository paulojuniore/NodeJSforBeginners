const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro
}

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

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
                tags: ['api'],
                description: 'Deve listar heróis',
                notes: 'Pode paginar resultados e filtrar por nomes também.',
                validate: {
                    // payload -> body da requisição
                    // headers -> header
                    // params -> na url {id:}
                    // query -> skip=0?limit=10
                    failAction, 
                    headers,
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
                tags: ['api'],
                description: 'Deve cadastrar heróis',
                notes: 'Cadastra um herói a partir de um nome e poder.',
                validate: {
                    failAction,
                    headers,
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
                tags: ['api'],
                description: 'Deve atualizar um herói específico',
                notes: 'Atualiza o nome/poder de um herói já cadastrado a partir do seu id.',
                validate: {
                    failAction,
                    headers,
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
                tags: ['api'],
                description: 'Deve remover um herói específico',
                notes: 'Remove o registro de um herói já existente no banco a partir do seu id.',
                validate: {
                    failAction,
                    headers,
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