import React from 'react';
import Avatar from './components/avatar/Avatar';
import Plate from './components/plate/Plate';

import './styles.scss';

export const App = () => {
  return (
    <div>
      <Plate />
      <Avatar />
    </div>
  );
};

export default App;
