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
    ...USER, 
    password: ''
}

describe('Auth test suite', function() {
    this.beforeAll(async() => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        
    })

    it('deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)
    })
})