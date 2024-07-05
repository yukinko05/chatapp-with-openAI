import React, {createContext, ReactNode, useEffect, useState} from "react";
import {User, onAuthStateChanged} from "firebase/auth"
import {auth} from "../../firebase";

type AppProviderProps = {
    children: ReactNode;
};

type AppContextType = {
    user: User | null;
    userId: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    selectedRoom: string | null;
    setSelectedRoom: React.Dispatch<React.SetStateAction<string | null>>;
};

const defalutContextData = {
    user: null,
    userId: null,
    setUser: () => {
    },
    selectedRoom: null,
    setSelectedRoom: () => {
    },
};

const AppContext = createContext<AppContextType>(defalutContextData);

export function AppProvider({children}: AppProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            setUser(newUser);
            setUserId(newUser ? newUser.uid : null);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AppContext.Provider
            value={{user, userId, setUser, selectedRoom, setSelectedRoom}}
        >
            {children}
        </AppContext.Provider>
    );
}