require('dotenv').config()

const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();
const io = socketIO(server, { cors: { origin: "*" } });

const connectDB = require('./DB')
const User = require("./Models/userSchema")
const { modifyUser, addUnsendMsgs, sendUnsendMsgs } = require('./controllers')

let users = []
let unSendMsgs = []

io.on('connection', (socket) => {

    console.log('A new client connected:', socket.id);

    socket.on("newUser", async (flag, myUser) => {
        try {
            await connectDB(process.env.MONGO_ATLAs_URL)


            if (flag == "login") {
                console.log("login")
                const userExists = await User.findOne({ ...myUser })

                if (userExists) {
                    const isUserActive = users.findIndex(one => one.num == userExists.num)
                    if (isUserActive == -1) {
                        users.push({
                            num: userExists.num,
                            name: myUser.name,
                            id: socket.id
                        })

                        console.log("users", users)

                        await sendUnsendMsgs(
                            {
                                num: userExists.num,
                                name: myUser.name
                            },
                            socket
                        )

                        socket.emit("getNewUser", {
                            name: myUser.name,
                            num: userExists.num,
                            pass: userExists.pass,
                        })
                    }
                }
            } else {
        
                const userExists = await User.findOne({ ...myUser })

                if (!userExists) {

                    let newUser = await User.findOne({ num: myUser.num })
                    if(newUser){
                        newUser.set(myUser);
                        await newUser.save();
                    } else {
                        newUser = new User({ ...myUser })
                        await newUser.save()
                    }

                    console.log(newUser)
                    socket.emit("registerDone")

                }
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("sendMsg", ({ user, frnds, msg }) => {

        console.log(users)

        let grpName = {}
        if (frnds.length > 2) {
            grpName = frnds.shift()
        }

        const toFrnds = frnds.map(one => {
            const found = users.find(d => d.num == one.num)

            if (found) {
                return found
            }
            else {
                console.log(one)
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

        if (frnds.length > 0) {
            frnds.unshift(grpName)
        }

        if (frndsIds.length != 0) {
            socket.to(frndsIds).emit("getMsg", { user, frnds, msg, time: Date.now() })
        }
    })

    socket.on("delUserInServer", (user) => {
        const isUserActive = users.findIndex(one => one.num == user.num)
        if (isUserActive != -1) {
            users.splice(isUserActive, 1)
        }

        console.log("deleted")
    })

    socket.on('disconnect', async () => {
        console.log(users, unSendMsgs)

        try {
            await connectDB(process.env.MONGO_ATLAs_URL)

            console.log("connected to mongoose db")

            await modifyUser(users)

            users = users.filter(one => one.id != socket.id)

            console.log("added users to db")
            console.log(users)

            await addUnsendMsgs(unSendMsgs)

            unSendMsgs = []

        }
        catch (err) {
            console.log(err);

            console.log("error in saving unsend msgs and users to db")
        }

        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Server listening on port 3001...');
});
