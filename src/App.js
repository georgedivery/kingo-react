import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from "react";

import './assets/fonts/Montserrat-Black.otf';
import './assets/fonts/Montserrat-Bold.otf';
import './assets/fonts/Montserrat-Regular.otf';
import './assets/fonts/Montserrat-UltraLight.otf';
import './App.css';


import Home from './pages/Home';
import PersonalVestingPage from './pages/PersonalVestingPage';
import NoPage from './pages/NoPage';
import { reducer, initialState } from "./context"; 
import { AppContext } from "./context";



function App() { 
    const [state, dispatch] = useReducer(reducer, initialState);
  
    return (
        <AppContext.Provider value={{ state, dispatch }} >
           
            <BrowserRouter basename={'/ptrn'}>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/personal-vesting" element={<PersonalVestingPage />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter >
        </AppContext.Provider>
    );
}

export default App;
