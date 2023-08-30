import { Route, Routes } from "react-router-dom"
import Home from "./Home"
import { AddDog } from "./AddDog"

export const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="dogs" element={ <Home /> } />
            <Route path="dogs/addDog" element = { <AddDog /> } />
            <Route path="walkers" element={ <x /> } />
            <Route path="cities" element={ <x /> } />
        </Routes>
    )    
}