import React, { useState } from "react";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/SideBar";

function Chat() {

    const breakpoint = 700;
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);


    window.addEventListener("resize", e => {
        let isMobileNow = window.innerWidth < breakpoint;
        if (isMobile !== isMobileNow)
            setIsMobile(isMobileNow);
    })

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className={`${isMobile ? "col-1 position-relative p-0" : "col-2"}  h-100 `}>
                    <Sidebar isMobile={isMobile} />
                </div>
                <div className={`${isMobile ? "col-11 p-0" : "col-10 border-left"}   h-100  `}>
                    <Content isMobile={isMobile} />
                </div>
            </div>
        </div>
    )
}



export default Chat;