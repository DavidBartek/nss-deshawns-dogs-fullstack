import { useEffect, useState } from "react";
import { getCities, getFilteredWalkers, getWalkers } from "./apiManager";
import { Form, FormGroup, Input, Label } from "reactstrap";

export const Walkers = () => {
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        getWalkers()
            .then((data) => {
                setWalkers(data);
            })
        getCities()
            .then((data) => {
                setCities(data);
            })
    }, [])
    
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

    
    if (!walkers || !cities) {
        return null;
    }
    return (
        <>
            <h2>OUR WALKERS</h2>
            <Form>
                <FormGroup tag="fieldset">
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
            return <p key={"walker--" + index}>{walker.name}</p>
        })}
        </>
    )
}