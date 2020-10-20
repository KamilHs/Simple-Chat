require('dotenv').config();
const express = require("express");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./db");

const Chat = require("./models/chat");
const Member = require("./models/member");
const Message = require("./models/message");


Chat.hasMany(Message, { onDelete: "CASCADE" });
Message.belongsTo(Chat);
Chat.hasMany(Member, { onDelete: "CASCADE" });
Member.belongsTo(Chat);


const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
}))


app.use(bodyParser.json());

app.get("/", (req, res, next) => res.send("<h1>Hello World</h1>"));



let server;
let io;

sequelize.sync().then(() => {
    server = require("http").createServer(app);
    io = socketIO();
    io.listen(server);
    server.listen(process.env.PORT || 5000);
    io.on("connection", socket => {
        let roomId;
        let username;
        socket.on("ROOM:SEND_MESSAGE", data => {
            const message = {
                avatar: "https://via.placeholder.com/50",
                time: new Date(),
                isOwn: false,
                content: data.message,
            }
            Message.create({ content: message.content, ChatId: roomId, author: username })
            socket.broadcast.to(roomId).emit("ROOM:NEW_MESSAGE", { ...message, author: username });
            socket.emit("ROOM:NEW_MESSAGE", { ...message, isOwn: true })
        })

        socket.on("ROOM:JOIN", async data => {
            roomId = data.chatId;
            username = data.username
            socket.join(roomId);
            socket.emit("ROOM:JOIN");

            io.to(roomId).emit("ROOM:GET_USERS", await getRoomMembers(roomId));
        })

        socket.on("ROOM:HISTORY", async () => {
            const messages = await Message.findAll({
                limit: 1000,
                order: [['createdAt', 'ASC']],
                where: { ChatId: roomId },
                attributes: {
                    include: ['author', 'content', ['createdAt', 'time']]
                },
            });

            socket.emit("ROOM:HISTORY", messages);
        })

        socket.on("disconnecting", async () => {
            if (!roomId) return;
            const chat = await Chat.findOne({ where: { Id: roomId } });
            await Member.destroy({ where: { name: username, ChatId: roomId } });
            if (chat && chat.creator === username) {
                io.to(roomId).emit("ROOM:CLOSE");
                io.of('/').in(roomId).clients(async (error, socketIds) => {
                    if (error) throw error;
                    socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(roomId));
                    await chat.destroy();
                });
            }
            else {
                socket.leave(roomId);
                io.to(roomId).emit("ROOM:GET_USERS", await getRoomMembers(roomId));
            }
        })

    })

}).catch(err => console.log(err));


app.post("/", async (req, res, next) => {
    const { chatId, username } = req.body;

    let chat = await Chat.findOne({ where: { Id: chatId } });
    let isNewChat = false;
    if (chat) {

    }
    else {
        chat = await Chat.create({ Id: chatId, creator: username });
        isNewChat = true;
    }

    const existingUser = await Member.findOne({ where: { name: username, ChatId: chat.Id } });
    if (existingUser)
        return res.json({ "success": false, "problem": "Username is already used" });

    await Member.create({ name: username, avatar: "https://via.placeholder.com/50", ChatId: chat.Id });

    return res.json({ "success": true, "status": isNewChat ? "Admin" : "Member" });
})


async function getRoomMembers(roomId) {
    const chat = await Chat.findOne({ where: { Id: roomId } });
    const users = await Member.findAll({ where: { ChatId: roomId } })
    return users.map(member =>
        ({
            avatar: member.avatar,
            username: member.name,
            status: chat.creator === member.name ? "Admin" : "Member"
        })
    );
}
