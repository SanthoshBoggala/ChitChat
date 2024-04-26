require('dotenv').config()

const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });

const connectDB = require('./DB')
const { modifyUser, addUnsendMsgs, sendUnsendMsgs } = require('./controllers')

const users = []
const unSendMsgs = []

io.on('connection', (socket) => {

    console.log('A new client connected:', socket.id);

    socket.on("user", async (user) => {
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
        await connectDB(process.env.MONGO_ATLAs_URL)

        await sendUnsendMsgs(user, socket)

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
                return found
            }
            else{
                unSendMsgs.push({
                    sender: user,
                    receiver: one,
                    friends: frnds,
                    msg,
                    time: Date.now()
                })
                return one
            }
        })

        const frndsIds = toFrnds
        .map(one => one.id)
        .filter(id => id !== undefined)

        if(frnds.length > 0){
            frnds.unshift(grpName)
        }

        if(frndsIds.length != 0){
            socket.to(frndsIds).emit("getMsg",{ user, frnds, msg }) 
        }
    })


    socket.on('disconnect', async () => {
        console.log(users, unSendMsgs)

        try{
            await connectDB(process.env.MONGO_ATLAs_URL)

            console.log("connected to mongoose db")

            await modifyUser(users)

            console.log("added users to db")

            await addUnsendMsgs(unSendMsgs)

        }
        catch(err){
            console.log(err);

            console.log("error in saving unsend msgs and users to db")
        }

        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001...');
});
