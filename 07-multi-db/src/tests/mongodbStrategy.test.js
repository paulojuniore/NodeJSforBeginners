const assert = require('assert')
const Context = require('../db/strategies/base/contextStrategy')
const MongoDB = require('../db/strategies/mongodb')
const context = new Context(new MongoDB())

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher maravilha',
    poder: 'Laço mágico'
}

describe('MongoDB Strategy', function () {
    this.beforeAll(async () => {
        await context.connect()
    }) 
    it('Verifica conexão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })
    it('Cadastra um novo heroi na base de dados mongoDB', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('Lista um novo heroi a partir do nome', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        const result = {nome, poder}
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})