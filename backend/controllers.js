const User = require('./Models/userSchema')
const UnsentMessage = require('./Models/unSendMsgSchema')

const modifyUser = async (users) => {
    try {
        for (const oneUser of users) {
            const { num, id, name } = oneUser;

            const user = await getUserByNum(num);
            if (user) {

                // user.socketId = id;
                // await user.save();
                // console.log(`SocketId updated for User ${user.name}`);

                console.log("user is already in mongo db")
            } else {
                const newUser = new User({ name, num })
                await newUser.save()
                console.log(`new user add ${name}`);
            }
        }
        console.log("All users updated successfully!");
    } catch (error) {
        console.error("Error updating users:", error);
    }
}

const addUnsendMsgs = async (unsendMsgs) => {
    try {
        for (const unsendMsg of unsendMsgs) {
            // Find receiver
            let isReceiverExists = await getUserByNum(unsendMsg.receiver.num)
            if (!isReceiverExists) {
                isReceiverExists = new User({ name: unsendMsg.receiver.name, num: unsendMsg.receiver.num })
                await isReceiverExists.save()
            }

            // Find sender
            const senderExists = await getUserByNum(unsendMsg.sender.num)

            const friendIds = []
            for (const frnd of unsendMsg.friends) {
                if (!frnd.name || !frnd.num) {
                    continue
                }

                const friendExists = await getUserByNum(frnd.num)
                if (!friendExists) {
                    const newUser = new User({ name: frnd.name, num: frnd.num })
                    await newUser.save()

                    friendIds.push(newUser._id)
                } else {
                    friendIds.push(friendExists._id)
                }
            }

            const newUnsentMsg = new UnsentMessage({
                sender: senderExists._id,
                receiver: isReceiverExists._id,
                friends: friendIds,
                time: unsendMsg.time,
                msg: unsendMsg.msg  // Corrected variable name from 'msg' to 'unsendMsg.msg'
            })

            await newUnsentMsg.save()
        }
    } catch (error) {
        console.log(error)
        console.log("Error in saving unsent messages to the database")
    }
}


const getUserByNum = async (num) => {
    try {
        const user = await User.findOne({ num })
        return user
    } catch (err) {
        console.log(err)
    }
}

const sendUnsendMsgs = async(user, socket)=>{
    try {
        let myUser = await getUserByNum(user.num)
        if(!myUser){
            myUser = new User({ name: user.name, num: user.num })
            await myUser.save()
        }
        const allUnsendMsgs = await UnsentMessage.find({ receiver: myUser._id })
            .populate('sender')
            .populate('receiver')
            .populate({
                path: 'friends',
                model: 'User'
            })

        await UnsentMessage.deleteMany({ receiver: myUser._id }) 
        

        for(const oneMsg of allUnsendMsgs){
            socket.emit("getMsg",{ 
                user: oneMsg.sender,
                frnds: oneMsg.friends,
                msg: oneMsg.msg,
                time: oneMsg.time
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { modifyUser, addUnsendMsgs , sendUnsendMsgs}