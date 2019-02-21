const { readFile } = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)

// outra forma de obter dados do json
// const dadosJson = require('./herois.json')

class Database {
    constructor() {
        this.FILENAME = "herois.json"
    }
    async getFileData() {
        const file = await readFileAsync(this.FILENAME, 'utf-8')
        return JSON.parse(file.toString())
    }
    writeFile() {

    }
    async list(id){
        const dados = await this.getFileData()
        const dataFilter = dados.filter(item => (id ? (item.id === id) : true))
        return dataFilter;
    }
}

module.exports = new Database()