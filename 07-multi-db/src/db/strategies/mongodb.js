const Crud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')

const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}

class MongoDB extends Crud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }

    connect() {
        Mongoose.connect('mongodb://localhost:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) {
                    return
                }
                console.log('Falha na conexão!', error)
            })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database is running!'))
        this._driver = connection
        this.defineModel()
    }

    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;
        if (state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve, 1500))
        return STATUS[this._driver.readyState]
    }

    defineModel() {
        const heroiSchema = Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        }) 
        this._herois = Mongoose.model('heroi', heroiSchema)
    }

    create(item) {
        return this._herois.create(item) 
    }

    read(query, skip=0, limit=10) {
        return this._herois.find(query)
    }

    update(id, item) {
        return this._herois.updateOne({_id: id}, {$set: item})
    }

    delete(id) {
        return this._herois.deleteMany({_id: id})
    }
   
}

module.exports = MongoDB