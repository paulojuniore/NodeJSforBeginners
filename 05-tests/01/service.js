const { get } = require('axios')

const URL = 'https://swapi.co/api/people'

async function getPeople(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    // console.log(JSON.stringify(result.data)) // Retorna o objeto do formato original da api
    return result.data.results.map(peopleMapping)
}

function peopleMapping(pessoa) {
    return {
        nome: pessoa.name,
        altura: pessoa.height
    }
}

module.exports = {
    getPeople
}