import { useEffect, useState } from "react";
import { getCities, getFilteredWalkers, getWalkers } from "./apiManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { AssignDog } from "./AssignDog";

export const Walkers = () => {
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [offCanvas, setOffCanvas] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedWalker, setSelectedWalker] = useState("");
    const [selectedDog, setSelectedDog] = useState("");

    useEffect(() => {
        getWalkers()
            .then((data) => {
                setWalkers(data);
            })
        getCities()
            .then((data) => {
                setCities(data);
            })
    }, []);
    
    const handleSelectCity = (cityName) => {
        // console.log(cityName);
        setSelectedCity(cityName);
        const foundCity = cities.find(city => city.name === cityName);
        // console.log(foundCity);

        if (!foundCity) {
            getWalkers()
                .then((data) => {
                    setWalkers(data);
                })
        } else {
            getFilteredWalkers(foundCity.id)
                .then((data) => {
                    setWalkers(data);
                    // console.log(data);
                })
        }   
    }

    const toggleOffCanvas = () => setOffCanvas(!offCanvas);

    const toggleModal = () => setModal(!modal);    
    
    if (!walkers || !cities) {
        return null;
    }
    return (
        <>
            <div className="walkers-container">
                <h2>OUR WALKERS</h2>
                <Form className="selectCity-form">
                    <FormGroup tag="fieldset" className="selectCity-input">
                        <Label for="citySelect">
                            Filter walkers by city
                        </Label>
                        <Input
                            id="citySelect"
                            name="citySelect"
                            type="select"
                            value={selectedCity}
                            onChange={(e) => {
                                
                                console.log(e.target.value);
                                handleSelectCity(e.target.value);

                            }}>
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
                </Form>
            {walkers.map((walker, index) => {
                return (
                <div className="walker-container" key={"walker--" + index}>
                    <h4 ><strong>{walker.name}</strong></h4>
                    <Button value={walker.name} color="primary" onClick={(e) => {
                        toggleOffCanvas();
                        function noRefCheck(){};
                        setSelectedWalker(e.target.value);
                        console.log(e.target.value);
                    }}>
                        Assign Dog</Button>
                    <Button color="danger">Fire Walker</Button>
                </div>
                
                )
            })}
            </div>
            <Offcanvas 
                isOpen={offCanvas}
                direction="end"
                toggle={() => {
                    toggleOffCanvas();
                    function noRefCheck(){};
                }}>
                <OffcanvasHeader toggle={() => {
                    toggleOffCanvas();
                    function noRefCheck(){};
                }}>
                    Dogs available for assignment
                </OffcanvasHeader>
                <OffcanvasBody>
                    <AssignDog selectedWalker={selectedWalker} walkers={walkers} setSelectedDog={setSelectedDog} toggleOffCanvas={toggleOffCanvas} toggleModal={toggleModal}/>
                </OffcanvasBody>
            </Offcanvas>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Dog assigned!</ModalHeader>
                <ModalBody>
                    {selectedDog} is now assigned to {selectedWalker}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>cool</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}