import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles.scss';
import PagesAll from './pages/pagesAll/PagesAll';

export const App = () => {
  return (
    <Router>
      <div>

        <PagesAll />
      </div>
    </Router>
  );
};

export default App;
