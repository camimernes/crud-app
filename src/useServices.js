import { useEffect, useState } from "react";

export const useServices = () => {
    const [register, setRegister] = useState([]);

    const getRegisters = () => {
        try {
            fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => setRegister(json))
        } catch (error) {
            console.log(error);
        } 
    }

    useEffect(() => {
        getRegisters()
     }, []);

    return register;
};