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
            const { friends, receiver, msg, time, sender } = unsendMsg

            // find reciever
            let isRecieverExists = await getUserByNum(receiver.num)
            if (!isRecieverExists) {
                isRecieverExists = new User({ name: receiver.name, num: receiver.num })
                await isRecieverExists.save()
            }
            // find sender
            const senderExists = await getUserByNum(sender.num)

            const friendIds = []
            for (const frnd of friends) {
                if (!frnd.name || !frnd.num) {
                    continue
                }

                const frndExists = await getUserByNum(frnd.num)
                if (!frndExists) {
                    const newUser = new User({ name: frnd.name, num: frnd.num })
                    await newUser.save()

                    friendIds.push(newUser._id)
                } else {
                    friendIds.push(frndExists._id)
                }

            }

            const newUnSendMsg = new UnsentMessage({
                sender: senderExists._id,
                receiver: isRecieverExists._id,
                friends: friendIds,
                time,
                msg
            })

            await newUnSendMsg.save()
        }
    } catch (error) {
        console.log(error)
        console.log("error in saving unsend msgs to db")
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
        let myUser = await getUserByNum(user.num);
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
                msg: oneMsg.msg
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { modifyUser, addUnsendMsgs , sendUnsendMsgs}