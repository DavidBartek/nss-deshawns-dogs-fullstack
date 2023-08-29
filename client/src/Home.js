import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(
    () => {
      getDogs()
        .then((data) => {
          setDogs(data)
          console.log(data);
        })
  }, []);


  if (!dogs) {
    return null;
  } else {
    return (
      <>
        <p>{greeting.message}</p>
        <div>
          {dogs.map(dog => {
            return <p>{dog.name}</p>
          })}
        </div>
      </>
    )
  }
}
