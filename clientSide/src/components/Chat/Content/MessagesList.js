import React, { useEffect } from "react";
import Message from "./Message";
import "./MessagesList.css";


function MessagesList({ messages, isMobile }) {
    let scrollTo;
    useEffect(() => {
        if (!scrollTo) return;
        scrollTo.scrollIntoView({ behavior: "smooth" });
    }, [messages, scrollTo])
    return (
        <div className={`${isMobile ? "p-1" : "p-3"} messages-container`} >
            <ul id="messages-list">
                {messages.map(message => (
                    <li key={message.time + Math.random().toString()} className="messages-list-item">
                        <Message
                            avatar={message.avatar}
                            content={message.content}
                            time={message.time}
                            isOwn={message.isOwn}
                            author={message.author}
                        />
                    </li>
                ))}
            </ul>
            <div ref={el => scrollTo = el}></div>
        </ div>
    )
}

export default MessagesList;