const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();

const io = socketIO(server, { cors: { origin: "*" } });

const users = []
const sendMsgs = []
const unSendMsgs = []

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

    socket.on("sendMsg", ({user, frnds, msg}) => {

        let grpName = {}
        if(frnds.length > 2){
            grpName = frnds.shift()
        }

        const toFrnds = frnds.map(one => {
            const found = users.find(d => d.num == one.num)
    
            if(found){
                sendMsgs.push({
                    from: user,
                    to: one,
                    msg,
                    date: Date.now()
                })
                return found
            }
            else{
                unSendMsgs.push({
                    from: user,
                    to: one,
                    msg,
                    date: Date.now()
                })
                return one
            }
        })

        const frndsIds = toFrnds
        .map(one => one.id)
        .filter(id => id !== undefined)

        console.log(unSendMsgs, frndsIds)

        if(frnds.length > 0){
            frnds.unshift(grpName)
        }

        if(frndsIds.length != 0){
            socket.to(frndsIds).emit("getMsg",{ user, frnds, msg }) 
        }
    })


    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001...');
});
