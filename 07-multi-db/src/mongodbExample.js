const Mongoose = require('mongoose')

setTimeout(() => {
    const state = connection.readyState
    console.log('state: ', state)
}, 3000)

/*
    Estados de conexão com Mongoose
    0: Desconectado
    1: Conectado
    2: Conectando
    3: Desconectando
*/



async function main() {
    
}

main()