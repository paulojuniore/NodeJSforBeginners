const service = require('./service')

async function main() {
    try {
        const result = await service.getPeople('a')
        const nomes = []

        // FOR
        console.time('for')
        for (let i = 0; i < result.results.length; i++) {
            const pessoa = result.results[i]
            nomes.push(pessoa.name)
        }
        console.timeEnd('for')

        // FOR-IN
        console.time('for-in')
        for(let i in result.results) {
            const pessoa = result.results[i]
            nomes.push(pessoa.name)
        }
        console.timeEnd('for-in')

        // FOR-OF
        console.time('for-of')
        for(pessoa of result.results) {
            nomes.push(pessoa.name);
        }
        console.timeEnd('for-of')
        
        console.log(nomes)
    } catch (error) {
        console.error('DEU ERRADO!', error)
    }
}

main()