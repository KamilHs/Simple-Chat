import React from "react";

import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import socket from "../../../socket";


class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }
    componentDidMount() {
        if (!socket) return;
        socket.on("ROOM:NEW_MESSAGE", data => {
            let newMessages = [...this.state.messages, data];
            this.setState({ messages: newMessages })
        })

        socket.emit("ROOM:HISTORY");
        socket.on("ROOM:HISTORY", data => this.setState({ messages: data }))
    }
    handleSubmit(message) {
        socket.emit("ROOM:SEND_MESSAGE", { message, id: socket.id })
    }
    render() {
        return (
            <div className="content position-relative  h-100">
                <MessagesList isMobile={this.propsisMobile} messages={this.state.messages} />
                <MessageInput handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

export default Content;