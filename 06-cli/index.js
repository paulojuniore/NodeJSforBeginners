const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', 'Nome do Herói')
        .option('-p, --poder [value]', 'Poder do Herói')
        .option('-i, --id [value]', 'Id do Herói')

        .option('-c, --cadastrar', 'Cadastrar um Herói')
        .option('-r, --remover [value]', 'Remover um Herói pelo id')
        .option('-l, --listar [value]', 'Listar todos os Heróis')
        .option('-a, --atualizar [value]', 'Atualiza o(s) dado(s) de um Herói')

        .parse(process.argv)

    const heroi = new Heroi(Commander)
    try {
        if(Commander.cadastrar) {
            const result = await Database.register(heroi)
            if(!result) {
                console.log('Herói não cadastrado!')
                return;
            }
            console.log('Herói cadastrado com sucesso!')
        }
        else if(Commander.remover) {
            const result = await Database.remove(heroi.id)
            if(!result){
                console.log('Herói não encontrado!')
                return;
            }
            console.log('Herói removido com sucesso!')
        }
        else if(Commander.listar) {
            const result = await Database.list(heroi.id)
            if(!result) {
                console.log('Herói não encontrado!')
                return;
            }
            console.log(result)
        }
        else if(Commander.atualizar) {
            // const { nome, poder } = heroi
            // const result = await Database.update(heroi.id, {nome, poder})
            const idParaAtualizar = parseInt(Commander.atualizar);
            // remover todas as chaves que estiverem com undefined || null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            const result = await Database.update(idParaAtualizar, heroiAtualizar)
            if(!result) {
                console.log('Herói não existente ou dados inválidos!')
            }
            console.log('Herói atualizado com sucesso!')
        }
    } catch (error) {
        console.error('ERRO!', error)
    }
}

main()