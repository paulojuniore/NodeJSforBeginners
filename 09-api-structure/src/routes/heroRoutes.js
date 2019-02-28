const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this._db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this._db.read()
            }
        }
    }

    read() {
        return {
            path: '/herois',
            method: 'POST',
            handler: (request, headers) => {
                return this._db.read()
            }
        }
    }
}

module.exports = HeroRoutes