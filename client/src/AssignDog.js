import { useEffect, useState } from "react";
import { getFilteredDogs, postAssignWalker } from "./apiManager";
import { Button } from "reactstrap";

export const AssignDog = ( {selectedWalker, walkers, setSelectedDog, toggleOffCanvas, toggleModal } ) => {
    const [filteredDogs, setFilteredDogs] = useState([]);

    useEffect(() => {
        const foundWalker = walkers.find(walker => walker.name === selectedWalker);
        // console.log(foundWalker.id);

        getFilteredDogs(foundWalker.id)
            .then(data => {
                setFilteredDogs(data);
                // console.log(data);
            })
    },[])
    
    const handleAssign = (dogName, dogId) => {
        const foundWalker = walkers.find(walker => walker.name === selectedWalker);
        setSelectedDog(dogName)
        postAssignWalker(dogId, foundWalker.id);
        toggleModal();
        toggleOffCanvas();
    }

    if (!filteredDogs || filteredDogs === []) {
        return "No dogs available for assignment."
    }
    return (
        <>
        {filteredDogs.map(dog => (
            // return <p>{dog.Id} {dog.name} city: {dog.cityId} walker: {dog.walkerId}</p>
                <div className="assignDog-container" key={dog.id}>
                    <Button 
                        className="assignButton"
                        color="success"
                        onClick={() => {
                        handleAssign(dog.name, dog.id)}}
                    >
                        Assign
                    </Button>
                    <h5 className="assignName">{dog.name}</h5>
                </div>
            ))
        }
        </>
    )
}