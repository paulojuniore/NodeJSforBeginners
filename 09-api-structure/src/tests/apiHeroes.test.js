const assert = require('assert')
const api = require('./../api')

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdWxvanVuaW9yZSIsImlkIjoxLCJpYXQiOjE1NTE3NTAzNTB9.FwRbBcTv1jlyN3DUfe8AsTsa9JJH625YE5iBTd_xzrY'

const headers = {
    authorization: TOKEN
}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Dr. Strange',
    poder: 'Controle psiquico'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Capitã Marvel',
    poder: 'Força absurda'
}

let MOCK_ID = {}

let app = ''
describe('Suíte de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            headers,
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_ATUALIZAR)
        })
        const dados = JSON.parse(result.payload)
        
        MOCK_ID = dados.id
    })

    it('listar /herois', async () => {
        const result = await app.inject({
            headers,
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
            headers,
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
            headers,
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
        const NOME = 'Dr. Strange'
        const result = await app.inject({
            headers,
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
            headers,
            method: 'POST',
            url: `/herois`,
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
        })    

        const statusCode = result.statusCode
        const { message, id } = JSON.parse(result.payload)
        
        assert.notStrictEqual(id, undefined)
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, "Herói cadastrado com sucesso!")
    })

    it('Atualizar um héroi PATCH - atualizando um herói por _id', async () => {
        const _id = MOCK_ID
        const expected = {
            nome: 'Chapolim Colorado',
            poder: 'Marreta biônica'
        }
        const result = await app.inject({
            headers,
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, 'Herói atualizado com sucesso!')
    })

    it('Atualizar um héroi PATCH - não deve atualizar com id inválido!', async () => {
        const _id = `5c76db5c140a0734e087f6b9`
        const updates = {
            nome: 'Chapolim Colorado',
            poder: 'Marreta biônica'
        }
        const result = await app.inject({
            headers,
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(updates)
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        const expected = { statusCode: 412,
            error: 'Precondition Failed',
            message: 'id não encontrado no banco!' }

        assert.ok(statusCode === 412)
        assert.deepEqual(dados, expected)
    })

    it('Remover um herói /DELETE a partir do id.', async () => {
        const _id = MOCK_ID
        const result = await app.inject({
            headers,
            method: 'DELETE',
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        assert.deepEqual(dados.message, "Herói removido com sucesso!")
    })

    it('Remover um herói /DELETE não deve remover com id inválido.', async () => {
        const _id = '5c76db5c140a0734e087f6b9'
        const result = await app.inject({
            headers,
            method: 'DELETE',
            url: `/herois/${_id}`
        })
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)
        assert.ok(statusCode === 412)
        assert.deepEqual(dados.message, "id não encontrado no banco!")
    })

})