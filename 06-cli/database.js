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

    async list(id) {
        const dados = await this.getFileData()
        const dataFilter = dados.filter(item => (id ? (item.id === id) : true))
        return dataFilter;
    }

    async remove(id) {
        if(!id) {
            return await this.writeFile([])
        }
        const data = await this.getFileData()
        const index = data.findIndex(item => item.id === parseInt(id))
        if(index === -1)
            throw Error('The hero doesn\'t exists')
        data.splice(index, 1)
        return await this.writeFile(data)
    }

    async update(id, changes) {
        const dataFile = await this.getFileData();
        const index = dataFile.findIndex(item => item.id === parseInt(id))
        if(index === -1)
            throw Error('The hero with especified id doesn\'t exists')
        const atual = dataFile[index]
        const novo = { ...atual, ...changes }
        dataFile.splice(index, 1)
        return await this.register([{ ...dataFile, novo }])
    }
}

module.exports = new Database()