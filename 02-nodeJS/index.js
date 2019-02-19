/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir do seu Id.
2 - Obter o endereço do usuário a partir do Id.
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nomeUsuario: 'Johnny',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            ddd: 83,
            telefone: '988459039'
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'São José',
            numero: 1047
        })
    }, 2000);
}

// Modelo de CALLBACK
function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
    // null || "" || 0 === false
    if(error){
        console.error('DEU RUIM EM USUARIO', error);
        return;
    }
    obterTelefone(usuario.id, resolverTelefone = (error1, telefone) => {
        if(error1){
            console.error('DEU RUIM EM TELEFONE', error1);
            return;
        }
        obterEndereco(usuario.id, resolverEndereco = (error2, endereco) => {
            if(error2){
                console.error('DEU RUIM NO ENDERECO', error2);
                return;
            }
            console.log(`
                Nome: ${usuario.nomeUsuario},
                Telefone: (${telefone.ddd}) ${telefone.telefone}
                Endereço: ${endereco.rua},${endereco.numero}
            `)
        })
    })
});
