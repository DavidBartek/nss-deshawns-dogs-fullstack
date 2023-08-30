import { useEffect, useState } from "react";
import { getWalkers } from "./apiManager";

export const Walkers = () => {
    const [walkers, setWalkers] = useState([]);

    useEffect(() => {
        getWalkers()
            .then((data) => {
                setWalkers(data);
            })
    })
    
    
    if (!walkers) {
        return null;
    }
    return (
        <>
        {walkers.map(walker => {
            return <p>{walker.name}</p>
        })}
        </>
    )
}