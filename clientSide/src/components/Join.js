import React from "react";
import { useState } from "react";
import "./Join.css";

function Join({ error, handleSubmit }) {
    const [username, setUsername] = useState("");
    const [chatId, setChatId] = useState("");
    const [isValid, setIsValid] = useState(true);


    const checkInputsValue = (e) => {
        e.preventDefault();
        if (username.trim() === "" || chatId.trim() === "") {
            setIsValid(false);
            return;
        }
        handleSubmit(chatId, username);
    }

    return (
        <form action="#" onSubmit={checkInputsValue} className="join-form">
            <div className="form-group">
                <label htmlFor="chat-id">Chat Id</label>
                <input autoComplete='off' type="text" onChange={e => setChatId(e.target.value)} value={chatId} className="form-control" id="chat-id" />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input autoComplete='off' type="text" onChange={e => setUsername(e.target.value)} value={username} className="form-control" id="username" />
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <span className="error">{!isValid ? "Chat Id and Username are required" : error}</span>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}

export default Join;