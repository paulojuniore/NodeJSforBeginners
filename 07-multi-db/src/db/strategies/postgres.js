const Crud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends Crud {
    constructor() {
        super()
        this._driver = null,
        this._herois = null,
        this._conect()
    }

    _conect() {
        this._driver = new Sequelize(
            'heroes',
            'paulojuniore',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
    }

    async defineModel() {
        this._herois = driver.define('heroes', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true,
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROES',
            freezeTableName: false,
            timestamps: false
        })
        await Heroes.sync()
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true;
        } 
        catch (error) {
            console.log('fail!', error)
            return false;
        }
    }

    create(item) {
        console.log('O item foi salvo em Postgres')
    }
}

module.exports = Postgres