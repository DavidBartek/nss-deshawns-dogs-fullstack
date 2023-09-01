import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCities, getOneWalker } from "./apiManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const EditWalker = () => {
    const [walker, setWalker] = useState({});
    const [allCities, setAllCities] = useState([]);
    const [updatedWalkerName, setUpdatedWalkerName] = useState("");
    const [updatedWalkerCities, setUpdatedWalkerCities] = useState([]);
    const [modal, setModal] = useState(false);
   
    const navigate = useNavigate();
    const params = useParams();
    const walkerId = params.walkerId;
    
    useEffect(() => {
        getOneWalker(walkerId)
            .then((walkerData) => {
                setWalker(walkerData);
                setUpdatedWalkerCities(walkerData.cities);
                console.log(`filtered Cities:`);
                console.log(walkerData.cities);
            })
        getCities()
            .then((cityData) => {
                setAllCities(cityData);
                // console.log(data);
            })
    }, [])

    const handleRemoveCheckbox = (cityId) => {
        setUpdatedWalkerCities(prevCities => prevCities.filter(obj => obj.id !== cityId));
    }

    const handleAddCheckbox = (cityId, cityName) => {
        setUpdatedWalkerCities(prevCities => [...prevCities, {
            id: cityId,
            name: cityName
        }]);
    }

    useEffect(() => {
        getCities()
        .then((cityData) => {
            setAllCities(cityData);
            // console.log(data);
        }) 
    }, [updatedWalkerCities])

    const handleGoBack = () => {
        navigate("/walkers");
    }

    const toggleModal = () => setModal(!modal);

    const handleCancelSubmit = () => {
        toggleModal(false);
    }

    const handleSubmitWalkerEdits = () => {
        
        // PUT operations
        toggleModal(false);
        navigate("/walkers");
    }

    if (!walker) {
        return null;
    }
    return (
        <>
            <h3>Edit Details for {walker.name}</h3>
            <Form>
                <FormGroup>
                    <Label for="editWalker__Name">
                        Name
                    </Label>
                    <Input
                        id="editWalker__Name"
                        placeholder={walker.name}
                        value={updatedWalkerName}
                        onChange={(e) => setUpdatedWalkerName(e.target.value)}
                    />
                </FormGroup>
                {allCities.map(c => {
                    // console.log("current city and its id:");
                    // console.log(`${c.name} ${c.id}`)

                    // console.log("cities which should be checked (should be the same as 'filtered cities'):");
                    // console.log(updatedWalkerCities);
                    
                    const isChecked = updatedWalkerCities.some(city => city.id === c.id);
                    // console.log(isChecked);
                    
                    if (isChecked) {
                        return <FormGroup check inline key={"city--" + c.id}>
                            <Input
                                id="cityCheckbox"
                                type="checkbox"
                                checked
                                onChange={() => {
                                    handleRemoveCheckbox(c.id, c.name);
                                }}
                            />
                            {' '}
                            <Label check for="cityCheckbox">
                            {c.name}
                            </Label>
                        </FormGroup>
                    } else if (!isChecked) {
                        return <FormGroup check inline key={"city--" + c.id}>
                            <Input
                                id={`cityCheckbox-${c.id}`}
                                type="checkbox"
                                onChange={() => {
                                    handleAddCheckbox(c.id, c.name);
                                }}
                            />
                            {' '}
                            <Label check for={`cityCheckbox-${c.id}`}>
                                {c.name}
                            </Label>
                        </FormGroup>
                    }
                    
                })}
                    
                <div className="button-container">
                    <Button
                        color="secondary"
                        onClick={handleGoBack}
                    >
                        Go Back
                    </Button>
                    <Button
                        color="danger"
                        onClick={toggleModal}
                    >
                        Submit Changes
                    </Button>
                </div>
            </Form>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Confirm these changes?</ModalHeader>
                <ModalBody>
                    Walker's Name: <strong>{updatedWalkerName ? updatedWalkerName : walker.name}</strong> <br />      
                    Cities: <strong>{updatedWalkerCities.length === 0 ? "no assigned cities" : updatedWalkerCities.map(city => `${city.name} `)}</strong>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCancelSubmit}>
                        Nah dog lol
                    </Button>
                    <Button color="danger" onClick={handleSubmitWalkerEdits}>
                        Yes
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}