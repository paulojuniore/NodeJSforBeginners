const Crud = require('./interfaces/interfaceCrud')

class Postgres extends Crud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}

module.exports = Postgres