const { getPeople } = require('./service')

// Criando meu próprio reduce
Array.prototype.meuReduce = function(callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for(let index = 0; index < this.length; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal;
}

async function main() {
    try {
        const { results } = await getPeople('a')
        // Obtém um array com os pesos de todos os personagens
        const pesos = results.map(pessoa => parseInt(pessoa.height));
        console.log('Pesos:', pesos)
        // Reduz todo o array de pesos à uma soma de todos os pesos
        const sumHeights = pesos.reduce((peso, total) => total + peso, 0)

        const myList = [
            ['Paulo', 'Mendes'],
            ['da', 'Silva', 'Júnior']
        ]
        const myName = myList.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, []).join(' ')

        console.log('Soma dos pesos:', sumHeights)
        console.log('Meu nome completo:', myName)
    } catch (error) {
        console.error('ERROR!', error)
    }
}

main()
