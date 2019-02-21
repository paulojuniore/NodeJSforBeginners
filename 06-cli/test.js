const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de hérois', () => {
    before(async () => {
        await database.register(DEFAULT_ITEM_CADASTRAR)
    })
    it('deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.list(expected.id)
        deepEqual(resultado, expected)
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.register(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.list(DEFAULT_ITEM_CADASTRAR.id)
        ok(actual, expected)
    })
})