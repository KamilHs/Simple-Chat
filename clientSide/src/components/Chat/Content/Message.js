import React from "react";
import "./Message.css";


function Message({ avatar, content, time, isOwn, author }) {

    return (
        <div className={`d-flex ${isOwn ? "own" : "other"}-message message position-relative w-100`}>
            <div className={`d-flex ${isOwn ? "flex-row-reverse align-items-end" : " align-items-start"} mw-70`}>
                <div className="avatar-container">
                    <img src={avatar || "https://via.placeholder.com/50"} className="avatar" alt="avatar" />
                </div>
                <div className={`${isOwn ? "own" : "other"}-message-content message-content`}>
                    {!isOwn && <span className="author">{author}</span>}
                    <p className="content mb-1">{content}</p>
                    <div className={`d-flex ${!isOwn ? "justify-content-end" : ""}`}>
                        <span className="time">{(new Date(time)).toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message;