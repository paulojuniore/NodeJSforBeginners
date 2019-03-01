const assert = require('assert')
const api = require('./../api')

let app = {}
describe('Suíte de testes da API Heroes', function() {
    this.beforeAll(async () => {
        app = await api
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })

    it('Listar /herois - deve retornar somente 5 registros', async () => {
        const limit_size = 5
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit_size}`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode
        
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.length === limit_size)
    })

    it('Listar /herois - passando um limite não númerico', async () => {
        const limit_size = 'AEEA'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${limit_size}`
        })
        
        assert.deepEqual(result.payload, "Erro interno no servidor!")
    })

    it('Listar /herois - filtrando por um item com um nome', async () => {
        const NOME = 'Hvitserk'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?nome=${NOME}&skip=0&limit=10`
        })
        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)
        assert.deepEqual(dados[0].nome, NOME)
    })
})