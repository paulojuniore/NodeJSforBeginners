const { readFile, writeFile } = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

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
    async writeFile(data) {
        await writeFileAsync(this.FILENAME, JSON.stringify(data))
        return true;
    }
    async register(hero) {
        const file = await this.getFileData();
        const id = hero.id <= 2 ? hero.id : Date.now()
        const heroWithId = { ...hero, id }
        const finalData = [ ...file, heroWithId ]
        const result = await this.writeFile(finalData)
        return result;
    }
    async list(id){
        const dados = await this.getFileData()
        const dataFilter = dados.filter(item => (id ? (item.id === id) : true))
        return dataFilter;
    }
}

module.exports = new Database()