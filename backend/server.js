const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();

const io = socketIO(server, { cors: { origin: "*" } });

const users = []

io.on('connection', (socket) => {
    console.log('A new client connected:', socket.id);

    socket.on("user", (user) => {
        if(!user) return
        const userExists = users.findIndex(one => one.num == user.num)
        let newUser = {
                    num: user.num,
                    name: user.name,
                    id: socket.id 
                }
        if (userExists !== -1) {
            users.splice(userExists, 1)
        }

        users.push(newUser)
    })

    socket.on("sendMsg", (user, frnds, msg) => {

        const toFrnds = users.filter(one =>{

            const isUser = frnds.find(frnd => frnd.num == one.num)
            if(isUser) return true
            else false
        })

        const frndsIds = toFrnds.map(one => one.id)
        console.log(frndsIds)

        if(toFrnds.length != 0){
            socket.to(frndsIds).emit("getMsg",user, frnds, msg,  (ack) => {
                console.log("Acknowledgment from receiver:", ack);
            })
        }
    })


    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);

        users.findIndex(user => user.id === socket.id);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001...');
});
