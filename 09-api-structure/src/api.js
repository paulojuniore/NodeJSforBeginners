// npm install hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const heroiSchema = require('./db/strategies/mongodb/schemas/heroiSchema')
const Mongodb = require('./db/strategies/mongodb/mongodb')

const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')
const JwtSecret = 'minhasenhasecreta123'

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('.//db/strategies/postgres/schemas/usuarioSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')

const app = new Hapi.Server({
    port: 3000
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, heroiSchema))
    // console.log('mapRoutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))

    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, model))

    const swaggerOptions = {
        info: {
            title: 'API de Heróis - #NodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JwtSecret,
        // options: {
        //     expiresIn: 20
        // }
        validate: async (data, request) => {
            // verifica no banco se o usuário continua ativo
            // console.log('dado', data)
            const [result] = await contextPostgres.read({
                username: data.username.toLowerCase()
            })
            // console.log('result', result)
            if(!result) {
                return {
                    isValid: false
                }
            }
            return {
                isValid: true // caso não válido => false
            }
        }
    })

    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JwtSecret, contextPostgres), AuthRoute.methods())
    ])

    await app.start()
    console.log('Server is running on port', app.info.port)

    return app
}

module.exports = main()