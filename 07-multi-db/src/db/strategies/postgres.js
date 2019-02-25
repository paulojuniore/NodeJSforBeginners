const Crud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends Crud {
    constructor() {
        super()
        this._driver = null,
        this._herois = null
    }

    async connect() {
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
        await this.defineModel()
    }

    async defineModel() {
        this._herois = this._driver.define('heroes', {
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
        await this._herois.sync()
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

    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues
    }
}

module.exports = Postgres