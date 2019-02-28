const http = require('http')

http.createServer((request, response) => {
    response.end('Hello Node!!!')
}).listen(3000, console.log('Server is running!'))