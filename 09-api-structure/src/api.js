// npm install hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const Mongodb = require('./db/strategies/mongodb/mongodb')

const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 3000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, heroiSchema))
    console.log('mapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])

    await app.start()
    console.log('Server is running on port', app.info.port)

    return app
}

module.exports = main()