import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import { getCities, getDogs, getWalkers } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [dogs, setDogs] = useState([]);
  const [cities, setCities] = useState([]);
  const [walkers, setWalkers] = useState([]);
  const [open, setOpen] = useState("-1");

  useEffect(
    () => {
      getDogs()
        .then((data) => {
          setDogs(data);
          // console.log(data);
        })
      getCities()
        .then((data) => {
          setCities(data);
        })
      getWalkers()
        .then((data) => {
          setWalkers(data);
        })
  }, []);

  const toggle = (id) => {
    if (open === id) {
      setOpen("-1");
    } else {
      setOpen(id);
    }
  }


  if (!dogs) {
    return null;
  } else {
    return (
      <>
        <h2>OUR DOGS</h2>
        <div>
          <Accordion open={open} toggle={toggle}>
            
          {dogs.map((dog, index) => {
            // console.log(dog);
            // console.log(index);
            
            let cityString = null;
            let walkerString = null;

            for (const city of cities) {
              if (dog.cityId === city.id) {
                cityString = city.name;
              }
            };

            for (const walker of walkers) {
              if (!dog.walkerId) {
                walkerString = "no one";
              } else if (dog.walkerId === walker.id) {
                walkerString = walker.name;
              }
            };

            return (
            <AccordionItem key={index}>
              <AccordionHeader targetId={index.toString()}>{dog.name}</AccordionHeader>
              <AccordionBody accordionId={index.toString()}>{dog.name} lives in {cityString} and is assigned to {walkerString}</AccordionBody>
            </AccordionItem>
            )
          })}

          </Accordion>
          
        </div>
      </>
    )
  }
}
