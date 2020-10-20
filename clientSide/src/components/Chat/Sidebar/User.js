import React from "react";
import "./User.css";


function User({ username, status, avatar }) {
    return (
        <div className="user d-flex flex-wrap text-center justify-content-between py-3 align-items-start">
            <img className="user-avatar" src={avatar} alt="avatar" />
            <div className="user-info text-left">
                <span className="username d-block">{username}</span>
                <span className="status">{status}</span>
            </div>
        </div>
    )
}

export default User;