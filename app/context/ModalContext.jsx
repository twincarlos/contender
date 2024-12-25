"use client";
import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const [content, setContent] = useState(null);

    return (
        <ModalContext.Provider value={{ content, setContent }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalProvider;
export const useModal = () => useContext(ModalContext);
