const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const Jwt = require('jsonwebtoken')

const PasswordHelper = require('./../helpers/passwordHelper')

const failAction = (request, headers, erro) => {
    throw erro
}

const USER = {
    username: 'paulojuniore',
    password: 'minhasenhasecreta'
}

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super()
        this.secret = secret
        this.db = db
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter um token',
                notes: 'Faz login com usuário e senha do banco.',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request, headers) => {
                const { username, password } = request.payload

                // Fazendo a verificação se o usuário está cadastrado no banco de dados.
                const [usuario] = await this.db.read({ username: username.toLowerCase() })
                // if (username.toLowerCase() !== USER.username || password !== USER.password) {
                //     return Boom.unauthorized()
                // }
                if(!usuario) {
                    return Boom.unauthorized('O username informado não existe!')
                }

                const math = PasswordHelper.comparePassword(password, usuario.password)
                if(!math) {
                    return Boom.unauthorized('Usuário/Senha inválido(s).')
                }

                const token = Jwt.sign({
                    username: username,
                    id: usuario.id
                }, this.secret)

                return {
                    token
                }
            }
        }
    }
}

module.exports = AuthRoutes