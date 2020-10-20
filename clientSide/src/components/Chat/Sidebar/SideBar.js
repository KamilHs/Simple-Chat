import React, { Suspense } from "react";
import UserList from "./UsersList";
import "./Sidebar.css"



function Sidebar({ isMobile }) {

    if (isMobile) {
        let Menu = React.lazy(() => import("react-burger-menu").then(module => ({ default: module.slide })))
        return (
            <Suspense fallback="Loading...">
                <Menu>
                    <UserList />
                </Menu>
            </Suspense>
        )
    }
    return <UserList />
}

export default Sidebar;