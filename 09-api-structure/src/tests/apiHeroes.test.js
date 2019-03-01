const assert = require('assert')
const api = require('./../api')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Dr. Strange',
    poder: 'Controle psiquico'
}

let app = {}
describe('Suíte de testes da API Heroes', function () {
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

        const errorResultJoi = {
            "statusCode": 400,
            "error": "Bad Request",
            "message": "child \"limit\" fails because [\"limit\" must be a number]",
            "validation": {
                "source": "query",
                "keys": ["limit"]
            }
        }

        assert.deepEqual(result.statusCode, 400)
        assert.deepEqual(result.payload, JSON.stringify(errorResultJoi))
    })

    it('Listar GET /herois - filtrando por um item com um nome', async () => {
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

    it('Cadastrar POST /herois - cadastrando um novo herói', async () => {
        const result = await app.inject({
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })    

        const statusCode = result.statusCode
        const { message, _id } = JSON.parse(result.payload)

        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, "Herói cadastrado com sucesso!")
    })
})