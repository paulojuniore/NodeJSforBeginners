// npm install hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const Mongodb = require('./db/strategies/mongodb/mongodb')

const app = new Hapi.Server({
    port: 3000
})

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, heroiSchema))
    app.route([
        {
            path: '/herois',
            method: 'GET',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])

    await app.start()
    console.log('Server is running on port', app.info.port)
}

main()