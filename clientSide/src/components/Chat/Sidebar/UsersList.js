import React, { useEffect, useState } from "react";
import User from "./User";
import "./UserList.css";
import socket from "../../../socket";


function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!socket) return;
        socket.on("ROOM:GET_USERS", setUsers);
    }, []);

    return (
        <div className="users">
            <h5 className="text-center">Users</h5>
            <ul className="user-list">
                {users.map(({ username, status, avatar }, i) => (
                    <li key={`${username}${i * new Date()}`}>
                        <User username={username} status={status} avatar={avatar} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;

