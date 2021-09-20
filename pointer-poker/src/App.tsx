import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import ComponentForCheckingBackend from './pages/CheckngBackEnd/ComponentForCheckingBackend';
import './styles.scss';
import PagesAll from './pages/pagesAll/PagesAll';

export const App = () => {
  return (
    <Router>
      <div>
        {/* <ComponentForCheckingBackend /> */}
        <PagesAll />
      </div>
    </Router>
  );
};

export default App;
