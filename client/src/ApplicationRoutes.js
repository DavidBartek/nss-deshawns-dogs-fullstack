import { Route, Routes } from "react-router-dom"
import Home from "./Home"

export const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } >
                <Route path="walkers" element={ <x /> } />
                <Route path="cities" element={ <x /> } />
            </Route>
        </Routes>
    )    
}