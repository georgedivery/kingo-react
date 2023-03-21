import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useReducer } from 'react';
import './App.css';
import { reducer, initialState } from './context';
import { AppContext } from './context';

import './assets/fonts/Montserrat-Black.otf';
import './assets/fonts/Montserrat-Bold.otf';
import './assets/fonts/Montserrat-Regular.otf';
import './assets/fonts/Montserrat-UltraLight.otf';
import PageLoader from './components/pageLoader';

const Home = React.lazy(() => import('./pages/Home'));
const PersonalVestingPage = React.lazy(() => import('./pages/PersonalVestingPage'));
const NoPage = React.lazy(() => import('./pages/NoPage'));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BrowserRouter basename="/test">
        <React.Suspense fallback={<PageLoader/>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/personal-vesting" element={<PersonalVestingPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
