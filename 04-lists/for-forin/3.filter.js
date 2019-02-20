const { getPeople } = require('./service') 

Array.prototype.meuFilter = function(callback) {
    const lista = []
    for(index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined === false
        if(!result) continue;
        lista.push(result)
    }
    return lista;
}

async function main() {
    try {
        const { results } = await getPeople('a')
        // const familiaLars = results.filter(item => {
        //     // por default deve retornar um booleano
        //     // para informar se deve manter ou remover da lista
        //     // false -> remove da lista
        //     // true -> mantem na lista
        //     // not found = -1
        //     const filtro = item.name.toLowerCase().indexOf('lars') !== -1
        //     return filtro
        // })
        const familiaLars = results.meuFilter((item, index, lista) => {
            // console.log(`${index}-${lista.length}`)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
        const names = familiaLars.map((pessoa) => pessoa)
        console.log(names)
    } catch (error) {
        console.error('ERRO!', error)
    }
}

main()