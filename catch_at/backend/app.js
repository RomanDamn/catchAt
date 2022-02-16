const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const allUsersRouter = require('./routes/getAllUsers')
const addToFavoritesRouter = require('./routes/Favorites')
const getUserMessagesRouter = require('./routes/messages')
const corsMiddleware = require('./middleware/cors.middleware')
const messages = require('./services/messagesService')
const app = express();

app.use(corsMiddleware)
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(passport.initialize())
require("./middleware/passport")(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', allUsersRouter);
app.use('/api/favorites', addToFavoritesRouter);
app.use('/api/messages', getUserMessagesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const webSocketsServerPort = 9000;
const webSocketServer = require('websocket').server;
const http = require('http');
const { json } = require('body-parser');

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port', webSocketsServerPort)

const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};

const getUniqueId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0 * 10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  var userID = getUniqueId();
  console.log((new Date()) + 'Recieved a new connection from origin' + request.origin + '.')

  const connection = request.accept(null, request.origin)
  clients[userID] = connection;

  connection.on('message', async function (message) {

    if (message.type === 'utf8') {
      await messages.addMessage(message)
      // const getMessages = await messages.getUserMessages(1, 2)
      // console.log(getMessages, "=======GetAllMessages")
      // console.log('Reveived MEssage: ', message);
      for (key in clients) {
        // console.log(key, "--------------key")
        // getMessages.forEach(element => { console.log(element.dataValues.msg, "!!!!!!!!!!!element.msg"); clients[key].send(element.dataValues.msg) });
        clients[key].send(message.utf8Data);
       }
    }
  })
});

module.exports = app;