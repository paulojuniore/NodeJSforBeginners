// Códigos para configuração do postgres e mongodb

<code>docker ps</code> // mostra os processos que estão rodando na máquina 

<code>docker run </br>
    --name postgres </br>
    -e POSTGRES_USER=paulojuniore </br>
    -e POSTGRES_PASSWORD=minhasenhasecreta </br>
    -e POSTGRES_DB=heroes </br>
    -p 5432:5432 </br>
    -d </br>
    postgres</code>

<code>docker exec -it postgres /bin/bash</code> // entra no contêiner para rodar comandos nele</br>

<code>docker run </br>
    --name adminer </br>
    -p 8080:8080 </br>
    --link postgres:postgres </br>
    -d </br>
    adminer</code>

#--- MongoDB

<code>docker run </br>
    --name mongodb </br>
    -p 27017:27017 </br>
    -e MONGO_INITDB_ROOT_USERNAME=admin </br>
    -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin </br>
    -d </br>
    mongo:4</code>

<code>docker run </br>
    --name mongoclient </br>
    -p 3000:3000 </br>
    --link mongodb:mongodb </br>
    -d </br>
    mongoclient/mongoclient</code>

<code>docker exec -it mongodb
    mongo --host localhost -u admin -p senhaadmin
    --authenticationDatabase admin
    --eval "db.getSiblingDB('heroes').createUser({user: 'paulojuniore', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'heroes'}]})"</code>