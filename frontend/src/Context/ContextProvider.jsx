import React, { useState } from "react";
import UseContext from "./UseContext";

const UseContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    return (
        <UseContext.Provider value={{ user, setUser }}>
            {children}
        </UseContext.Provider>
    )
}
export default UseContextProvider