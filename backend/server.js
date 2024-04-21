const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();

const io = socketIO(server, { cors: { origin: "*" } });

const users = []

io.on('connection', (socket) => {
    console.log('A new client connected:', socket.id);

    socket.on("user", (user) => {
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
        console.log(users)
    })

    socket.on("sendMsg", (user, frnd, msg) => {
        const toFrnd = users.find(one => one.num == frnd.num)

        socket.to(toFrnd.id).emit("getMsg",user, frnd, msg)
    })


    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);

        setTimeout(() => {
            const index = users.findIndex(user => user.id === socket.id);
            if (index !== -1) {
                users.splice(index, 1);
            }
        }, 5000);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000...');
});
