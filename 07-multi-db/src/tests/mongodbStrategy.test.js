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
        await context.create(MOCK_HEROI_CADASTRAR)
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

    it('Atualizar um registro na tabela a partir do id', async () => {
        const result = await context.update('5c75b21e7c315822186dc228', {
            nome: 'Ragnar LothBrook',
            poder: 'Viking'
        })
        assert.deepEqual(result.nModified, 1)
    })

    it('Remove um registro da tabela a partir do seu id', async () => {
        const result = await context.delete('5c75b5b285ba8b2a588c94fd')
        assert.deepEqual(result.deletedCount, 1)
    })
})