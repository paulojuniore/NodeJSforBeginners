// Códigos para configuração do postgres e mongodb

<code>docker ps</code> // mostra os processos que estão rodando na máquina 

<code>docker run \
    --name postgres \
    -e POSTGRES_USER=paulojuniore \
    -e POSTGRES_PASSWORD=minhasenhasecreta \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres</code>

<code>docker exec -it postgres /bin/bash</code> // entra no contêiner para rodar comandos nele

<code>docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer</code>

#--- MongoDB

<code>docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
    -d \
    mongo:4</code>

<code>docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient</code>

<code>docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('heroes').createUser({user: 'paulojuniore', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'heroes'}]})"</code>

<code>npm install sequelize pg-hstore pg</code></br>

<code>npm install mongoose</code>