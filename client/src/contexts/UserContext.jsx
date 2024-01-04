import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}