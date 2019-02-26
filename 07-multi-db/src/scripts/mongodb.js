// docker ps
// docker exec -it "id do mongodb no docker" mongo -u "user" -p "password" --authenticationDatabase herois

// databases
show dbs

// mudando o contexto para um database
use herois

// mostrar tables (coleções)
show collections

db.Heroes.insert({
    nome: 'Lanterna verde',
    poder: 'Anel mágico',
    dataCadastro: new Date()
})

db.Heroes.find()
db.Heroes.find().pretty()

for(let i=0; i < 50; i++) {
    db.Heroes.insert({
        nome: `Clone-${i}`,
        poder: `Anel mágico-${i}`,
        dataCadastro: new Date()
    })
}

db.Heroes.count()
db.Heroes.findOne()
db.Heroes.find().limit(5).sort({ nome: -1 })

// find({Cláusula Where}, {Visibilidade das colunas, 1 para on e 0 off})
db.Heroes.find({ nome: 'Lanterna verde' }, { nome: 1, poder: 1, _id: 0 })

// CREATE
db.Heroes.insert({
    nome: 'Lanterna verde',
    poder: 'Anel mágico',
    dataCadastro: new Date()
})

// READ
db.Heroes.find()

// UPDATE
// dessa forma os dados das colunas que não serão atualizadas serão perdidos
db.Heroes.update({_id: ObjectId("5c7582a9ea0d7b96db1fd6cc")}, { nome: 'Flash' })
// dessa altera-se apenas a(s) coluna(s) especificada(s) e mantém-se os outros valores
db.Heroes.update({_id: ObjectId("5c75848fea0d7b96db1fd6cd")}, { $set: { nome: 'Mulher Gavião', poder: 'Marreta de Ferro' } })
db.Heroes.update({_id: ObjectId("5c7582a9ea0d7b96db1fd6cc")}, { $set: { nome: 'Flash', poder: 'Velocidade', dataCadastro: new Date() } })
// Altera apenas o primeiro que encontrar que satisfaça o where e não todos.
db.Heroes.update({ poder: 'Velocidade' }, { $set: { poder: 'Corrida' } })

// DELETE
// exclui toda a base de registros
db.Heroes.remove({})
// exclui a partir de condições
db.Heroes.remove({ nome: 'Flash' })
db.Heroes.remove({ poder: 'Anel mágico' })




