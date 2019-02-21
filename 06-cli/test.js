const { deepEqual, ok } = require('assert')

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Lanterna Verde',
    poder: 'Energia do anel',
    id: 2
}

describe('Suite de manipulação de hérois', () => {
    before(async () => {
        await database.register(DEFAULT_ITEM_CADASTRAR)
        await database.register(DEFAULT_ITEM_ATUALIZAR)
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

    // .only executa apena o teste que o contenha
    it('deve remover um heroi pelo o id', async () => {
        const expected = true
        const resultado = await database.remove(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it('deve atualizar um heroi pelo id', async () => {
        const expected = { ...DEFAULT_ITEM_ATUALIZAR }
        const newData = {nome: 'Batman', poder: 'Dinheiro'}
        await database.update(DEFAULT_ITEM_ATUALIZAR.id, newData)
        const [result] = await database.list(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(result, expected)
    })
})