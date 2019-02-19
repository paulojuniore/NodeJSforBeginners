/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir do seu Id.
2 - Obter o endereço do usuário a partir do Id.
*/

// Importando um módulo interno do node.js para converter para Promises funções que contenham callback
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
    // quando sucesso -> resolve
    // quando der erro -> reject
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error('DEU RUIM!'))
            return resolve({
                id: 1,
                nomeUsuario: 'Johnny',
                dataNascimento: new Date()
            })
        }, 1000);
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                ddd: 83,
                telefone: '988459039'
            })
        }, 2000);
    })
}

// ObterEndereco continua no modelo de callback para demonstração do promisify de util.
function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'São José',
            numero: 1047
        })
    }, 2000);
}

const usuarioPromise = obterUsuario()
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nomeUsuario,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(result) {
        console.log(`
            Usuario: ${result.usuario.nome}
            Telefone: (${result.telefone.ddd}) 9${result.telefone.telefone}
            Endereco: Rua ${result.endereco.rua}, ${result.endereco.numero} 
        `)
    })
    .catch(function(error) {
        console.error('DEU ERRADO!', error)
    })