import React, { useEffect, useState } from "react";
import "./MessageInput.css";



function MessageInput({ handleSubmit }) {
    const [message, setMessage] = useState("");
    let ref;
    const validateSubmision = e => {
        e.preventDefault();
        if (message.trim() === "") return;
        handleSubmit(message);
        setMessage("");
    }
    useEffect(() => ref.focus(), [ref]);
    return (
        <div className="message-input">
            <form action="#" onSubmit={validateSubmision}>
                <div className="form-group d-flex align-items-center">
                    <input ref={inp => ref = inp} value={message} onChange={e => setMessage(e.target.value)} autoComplete="off" className="form-control mr-3" placeholder="Enter message..." type="text" name="message" />
                    <button className="btn btn-primary" type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput;