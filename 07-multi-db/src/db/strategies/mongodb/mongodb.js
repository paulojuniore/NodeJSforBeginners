const Crud = require('../interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}

class MongoDB extends Crud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }

    static connect() {
        Mongoose.connect('mongodb://localhost:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) {
                    return
                }
                console.log('Falha na conexão!', error)
            })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database is running!'))
        
        return connection
    }

    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1500))
        return STATUS[this._connection.readyState]
    }

    create(item) {
        return this._schema.create(item) 
    }

    read(query, skip=0, limit=10) {
        return this._schema.find(query)
    }

    update(id, item) {
        return this._schema.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._schema.deleteMany({_id: id})
    }
   
}

module.exports = MongoDB