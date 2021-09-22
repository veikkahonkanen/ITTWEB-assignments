const { Server } = require('ws');
const scoreController = require('./score');
const { take } = require('rxjs/operators');

// Create Websocket server
var wss = new Server({ noServer: true });
module.exports.start = async function(server) {
    wss = new Server({ server });

    const apiResult = await scoreController.getTopNScores(10);
    apiResult.subscribe({
        next: (value) => { 
            console.log('Server: ' + value);
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(value));
            });
        }
    });

    // Send the initial high scores on connecting
    wss.on('connection', (ws, request) => {
        console.log('Client connected');
        // Send the top 10 on client connecting
        apiResult.pipe(take(1)).subscribe((value) => {
            ws.send(JSON.stringify(value));
        })
       
        ws.on('close', () => console.log('Client disconnected'));
    });
}

