const assert = require('assert')
const api = require('../api')
const Context = require('./../db/strategies/base/ContextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}
const USER = {
    user: 'paulojuniore',
    password: 'minhasenhasecreta'
}
const USER_DB = {
    username: USER.user.toLowerCase(), 
    password: '$2b$04$Wai5NG5HychC5mOjMkfjke2JQE5lmsDNVI0Gc1sRZW2Tx0IMwtu96'
}

describe('Auth test suite', function() {
    this.beforeAll(async() => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        await postgres.update(null, USER_DB, true)
    })

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        // console.log('token:', dados.token)
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })

    it('Deve retornar unauthorized ao tentar obter um login errado', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'paulojunior',
                senha: '123'
            }
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized")
    })
})