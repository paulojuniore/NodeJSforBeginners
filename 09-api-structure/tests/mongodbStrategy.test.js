const assert = require('assert')
const Context = require('./../src/db/strategies/base/contextStrategy')
const MongoDB = require('./../src/db/strategies/mongodb/mongodb')
const heroiSchema = require('./../src/db/strategies/mongodb/schemas/heroiSchema')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher maravilha',
    poder: 'Laço mágico'
}

let context = {}
describe('MongoDB Strategy', function () {
    this.beforeAll(async () => {
        const connection = MongoDB.connect()
        context = new Context(new MongoDB(connection, heroiSchema))
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
        const result = await context.update('5c81776601a03236ecf0eb8f', {
            nome: 'Capitão América',
            poder: 'Escudo'
        })
        assert.deepEqual(result.nModified, 1)
    })

    it('Remove um registro da tabela a partir do seu id', async () => {
        const result = await context.delete('5c8176731740b730085e51ce')
        assert.deepEqual(result.deletedCount, 1)
    })
})