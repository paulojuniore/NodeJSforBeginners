class NotImplementedException extends Error {
    constructor() {
        super('Not implemented exception!')
    }
}

class Crud {
    connect() {
        throw new NotImplementedException();
    }

    isConnected() {
        throw new NotImplementedException();
    }
    
    defineModel() {
        throw new NotImplementedException();
    }

    create(item) {
        throw new NotImplementedException();
    }

    read(query) {
        throw new NotImplementedException();
    }

    update(id, item) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }

}

module.exports = Crud