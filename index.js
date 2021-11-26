const Express = require('express')
const bodyParser = require('body-parser')

const app = Express()
const PORT = 8080

const dotenv = require('dotenv')
dotenv.config();

app.use(bodyParser())
// app.use(require('./routes/api'))
app.use(Express.static('public/'));

const { WebSocketServer } = require('ws')


let timers = {}

const wss = new WebSocketServer({ port: 6969 });

wss.on('connection', function connection(ws) {
	ws.on('message', function message(data) {
        wss.clients.forEach(ws => {
            let response = JSON.parse(data)
            // console.log(response)
            ws.send(JSON.stringify(response))
        });

	});

	// ws.send()
});

wss.on('close', function close() {
	console.log("Client closed connection")
});

console.log("listening on port: " + PORT)
app.listen(PORT)

