const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for(let i = 0; i < this.length; i++) {
        const resultado = callback(this[i], i)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function main() {
    try {
        const result = await service.getPeople('a')
        // const pessoas = []
        // result.results.forEach(item => {
        //     pessoas.push(item.name)
        // });

        // Usando o map do próprio ECS6
        const pessoas = result.results.map(pessoa => pessoa.name);
        // Usando a minha implementação do map
        const pessoas = result.results.meuMap((pessoa, indice) => `[${indice}] ${pessoa.name}`);
        console.log('pessoas:', pessoas)
    } catch (error) {
        console.error('ERRO!', error)
    }
}

main()