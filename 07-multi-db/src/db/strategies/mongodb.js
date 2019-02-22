const Crud = require('./interfaces/interfaceCrud')

class MongoDB extends Crud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}

module.exports = MongoDB