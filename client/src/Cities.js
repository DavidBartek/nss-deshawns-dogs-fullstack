import { useEffect, useState } from "react";
import { getCities, postCity } from "./apiManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const Cities = () => {
    const [cities, setCities] = useState([]);
    const [newCityName, setNewCityName] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getCities()
        .then((data) => {
            setCities(data);
        })
        }, []
    )

    const toggleModal = () => setModal(!modal);

    const handleCancelSubmit = () => {
        toggleModal(false);
    }

    const handleSubmitNewCity = () => {
        
        const newCity = {
            name: newCityName
        };

        postCity(newCity)
            .then(() => {
                getCities()
                    .then((data) => {
                        setCities(data);
                        setNewCityName("");
                    })
            })
        toggleModal(false);
    }

    if (!cities) {
        return null;
    }
    return (
        <div className="form-container">
            <div className="newCityForm">
                <h3 className="newCityForm--header">OUR EMPIRE</h3>
                <div>
                    {cities.map(city => {
                        return <p><strong>{city.name}</strong></p>
                    })}
                </div>
                <Form>
                    <FormGroup>
                        <Label for="addCity">
                            Add a city to conquer:
                        </Label>
                        <Input
                            id="addCity"
                            placeholder="New City's Name"
                            value={newCityName}
                            onChange={(e) => setNewCityName(e.target.value)}
                        />
                    </FormGroup>
                    <Button
                        color="primary"
                        onClick={toggleModal}>
                        Add
                    </Button>
                </Form>
            </div>
            {newCityName === "" ?
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Cannot submit an empty input</ModalHeader>
                <ModalFooter>
                    <Button color="secondary" onClick={handleCancelSubmit}>
                        o sorry
                    </Button>
                </ModalFooter>
            </Modal>
            : <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Add this city?</ModalHeader>
                <ModalBody>
                    New city's name: <strong>{newCityName}</strong>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitNewCity}>
                        Yes
                    </Button>
                    <Button color="secondary" onClick={handleCancelSubmit}>
                        Nah dog lol
                    </Button>
                </ModalFooter>
            </Modal>}
        </div>
    )
}