import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { getCities, postDog } from "./apiManager";
import { useNavigate } from "react-router-dom";

// dog's name
// dog's city (checkboxes)

export const AddDog = () => {
    const [cities, setCities] = useState([]);
    const [newDogName, setNewDogName] = useState("");
    const [newDogCity, setNewDogCity] = useState("");
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCities()
        .then((data) => {
          setCities(data);
        })
    }, [])

    const handleGoBack = () => {
        navigate("/dogs");
    }

    const toggleModal = () => setModal(!modal);

    const handleCancelSubmit = () => {
        toggleModal(false);
    }

    const handleSubmitNewDog = () => {
        
        const foundCity = cities.find(city => city.name === newDogCity);
        
        const newDog = {
            name: newDogName,
            cityId: foundCity.id
        };
        // console.log(newDog);
        postDog(newDog);
        toggleModal(false);
        navigate("/dogs");
    }
    
    return (
        <div className="form-container">
            <div className="newDogForm">
                <h2 className="newDogForm--header">FORM A NEW DOG</h2>
                <Form>
                    <FormGroup floating>
                        <Input  
                            required
                            id="addDog__Name"
                            placeholder="New Dog's Name"
                            value={newDogName}
                            onChange={(e) => setNewDogName(e.target.value)}
                        />
                        <Label for="dogName">
                            New Dog's Name
                        </Label>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <Label for="citySelect">
                            Select City
                        </Label>
                        <Input
                            required
                            id="citySelect"
                            name="citySelect"
                            type="select"
                            value={newDogCity}
                            onChange={(e) => setNewDogCity(e.target.value)}>
                            <option>Please select a city...</option>
                        {cities.map((city) => {
                        return (
                            <option key={"city--" + city.id}>
                                {city.name}
                            </option> 
                            )
                        })}
                        </Input>
                    
                    </FormGroup>
                    <div className="button-container">
                        <Button
                            color="secondary"
                            onClick={handleGoBack}>
                            Go Back
                        </Button>
                        <Button
                            color="primary"
                            onClick={toggleModal}>
                            Submit Dog
                        </Button>
                    </div>
                    {newDogName === "" || newDogCity === "" ? 
                        <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>Please add all information.</ModalHeader>
                            <ModalFooter>
                                <Button color="secondary" onClick={handleCancelSubmit}>
                                    ok lol
                                </Button>
                            </ModalFooter>
                        </Modal>
                        : <Modal isOpen={modal} toggle={toggleModal}>
                            <ModalHeader toggle={toggleModal}>Add this dog?</ModalHeader>
                            <ModalBody>
                                Name: <strong>{newDogName}</strong> <br />      
                                City: <strong>{newDogCity}</strong>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleSubmitNewDog}>
                                    Yes
                                </Button>
                                <Button color="secondary" onClick={handleCancelSubmit}>
                                    Nah dog lol
                                </Button>
                            </ModalFooter>
                        </Modal>}
                
                </Form>
            </div>
        </div>
        
    )
}