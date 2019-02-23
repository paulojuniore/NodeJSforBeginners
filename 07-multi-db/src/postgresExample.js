const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main(){
    const Heroes = driver.define('heroes', {
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
    await Heroes.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    const result = await Heroes.findAll({
        raw: true,
        attributes: ['nome']
    })
}

main()