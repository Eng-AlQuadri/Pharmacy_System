import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    selectedIndex: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setSelectedIndex: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const [token, _setToken] = useState(localStorage.getItem("PHARMACY_TOKEN"));

    // eslint-disable-next-line no-unused-vars
    const [selectedIndex, setSelectedIndex] = useState(
        localStorage.getItem("PHARMACY_LIST")
    );

    const [notification, _setNotification] = useState(null);

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("PHARMACY_TOKEN", token);
        } else {
            localStorage.removeItem("PHARMACY_TOKEN");
        }
    };

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                notification,
                selectedIndex,
                setUser,
                setToken,
                setNotification,
                setSelectedIndex,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
