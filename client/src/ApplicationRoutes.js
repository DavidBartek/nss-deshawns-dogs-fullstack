import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import { AddDog } from "./AddDog"
import { Walkers } from "./Walkers"
import { EditWalker } from "./EditWalker"
import { Cities } from "./Cities"

export const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="dogs" element={ <Home /> } />
            <Route path="dogs/addDog" element = { <AddDog /> } />
            <Route path="walkers" element={ <Walkers /> } />
            <Route path="walkers/edit/:walkerId" element={ <EditWalker /> } />
            <Route path="cities" element={ <Cities /> } />
        </Routes>
    )    
}