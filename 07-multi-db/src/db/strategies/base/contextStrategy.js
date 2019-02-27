const Crud = require('./../interfaces/interfaceCrud')

class ContextStrategy extends Crud {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    connect() {
        return this._database.connect()
    }

    create(item) {
        return this._database.create(item)
    }

    read(query, skip, limit) {
        return this._database.read(query).skip(skip).limit(limit)
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id) {
        return this._database.delete(id)
    }

    isConnected() {
        return this._database.isConnected()
    }
}

module.exports = ContextStrategy