const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const senha = '123'
const hash = '$2b$04$Wai5NG5HychC5mOjMkfjke2JQE5lmsDNVI0Gc1sRZW2Tx0IMwtu96'
describe('UserHelper test suite', async function() {
    it('Deve gerar um hash a partir de uma senha.', async() => {
        const result = await PasswordHelper.hashPassword(senha)
        // console.log('hash de senha:', result)
        assert.ok(result.length > 10)
    })

    it('Deve comparar uma senha e seu hash.', async() => {
        const result = await PasswordHelper.comparePassword(senha, hash)
        assert.deepEqual(result, true)
    })
})