import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCities, getOneWalker } from "./apiManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const EditWalker = () => {
    const [walker, setWalker] = useState({});
    const [allCities, setAllCities] = useState([]);
    const [updatedWalkerName, setUpdatedWalkerName] = useState("");
    const [updatedWalkerCities, setUpdatedWalkerCities] = useState([]);
   
    const navigate = useNavigate();
    const params = useParams();
    const walkerId = params.walkerId;
    
    useEffect(() => {
        getOneWalker(walkerId)
            .then((walkerData) => {
                setWalker(walkerData);
                setUpdatedWalkerCities(walkerData.cities);
                console.log(walkerData.cities);
            })
        getCities()
            .then((cityData) => {
                setAllCities(cityData);
                // console.log(data);
            })
    }, [])

    const handleGoBack = () => {
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
                    // console.log(c.id);
                    // console.log(walker.cities);
                    let isChecked = null;
                    for (const city of updatedWalkerCities) {
                        console.log(`walker city id: ${city.id}`)
                        if (city.id === c.id) {
                            isChecked = true;
                        } else if (city.id !== c.id) {
                            isChecked = false;
                        }
                    }
                    // const isChecked = updatedWalkerCities.includes(c.id);
                    // console.log(isChecked);
                    if (isChecked) {
                        return <FormGroup check inline key={"city--" + c.id}>
                            <Input
                                id="cityCheckbox"
                                type="checkbox"
                                checked
                                onChange={(e) => {
                                    const cityId = c.id;
                                    if (e.target.checked) {
                                        setUpdatedWalkerCities(prevCities => [...prevCities, cityId]);
                                    } else {
                                        setUpdatedWalkerCities(prevCities => prevCities.filter(id => id !== cityId));
                                    }
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
                                id="cityCheckbox"
                                type="checkbox"
                                onChange={(e) => {
                                    const cityId = c.id;
                                    if (e.target.checked) {
                                        setUpdatedWalkerCities(prevCities => [...prevCities, cityId]);
                                    } else {
                                        setUpdatedWalkerCities(prevCities => prevCities.filter(id => id !== cityId));
                                    }
                                }}
                            />
                            {' '}
                            <Label check for="cityCheckbox">
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
                        color="primary"
                        // onClick={toggleModal}
                    >
                        Submit Dog
                    </Button>
                </div>
            </Form>
        </>
    )
}