import React from "react";
import Join from "./components/Join";
import Chat from "./components/Chat/Chat";
import "./shared/main.css";
import socket from "./socket";
import BASE_URL from "./config";



class App extends React.Component {
    constructor() {
        super();
        this.state = { isJoined: false, username: "", error: "" }
        this.isLoading = false;
    }



    async handleJoinSubmit(chatId, username) {
        if (this.isLoading) return;
        this.isLoading = true;
        let res = await fetch(BASE_URL, {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                chatId, username
            })

        });
        let result = await res.json();
        this.isLoading = false;

        if (!result.success)
            this.setState({ error: result.problem });
        else {
            socket.emit("ROOM:JOIN", { chatId, username })
            socket.on("ROOM:JOIN", () => this.setState({ isJoined: true, username: username }));
            socket.on("ROOM:CLOSE", () => {
                this.setState({ isJoined: false, username: "", error: "Admin left or closed the chat" });
            })
        }
    }
    render() {
        return this.state.isJoined
            ? <Chat username={this.state.username} />
            : <Join
                error={this.state.error}
                handleSubmit={this.handleJoinSubmit.bind(this)}
            />
    }
}

export default App;