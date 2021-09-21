import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import LobbyPage from '../LobbyPage/LobbyPage';
import React from 'react';

const PagesAll = () => {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/lobby" component={LobbyPage} />
      </Switch>
    </div>
  );
};

export default PagesAll;
