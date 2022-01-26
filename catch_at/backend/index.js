const webSocketsServerPort = 9000;
const webSockerServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port', webSocketsServerPort)

const wsServer = new webSockerServer({
    httpServer: server
});

const clients = {};

const getUniqueId = () => {
    const s4 = () => Math.floor((1 + match.random()) * 0*10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request){
    var userID = getUniqueId();
    console.log((new Date()) + 'Recieved a new connection from origin' + request.origin + '.')

    const connection = request.accept(nell, request.origin)
    clients[userID] = connection;

    connection.on('message', function(message){
        if(message.type === 'utf8'){
            console.log('Reveived MEssage: ', message.utf8Data);

            for(key in clients) {
                clients[key].sendUTF(message.utf8Data);
            }
        }
    })
});