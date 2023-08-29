import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { TopNavBar } from "./TopNavBar";
import { Route, Routes } from "react-router-dom";
import { ApplicationRoutes } from "./ApplicationRoutes";

function App() {
  
  return (
    <Routes>
      <Route path="*" element={
        <div className="App">
          <TopNavBar />
          <ApplicationRoutes />
        </div>
      } />
    </Routes>
    
  );
}

export default App;
