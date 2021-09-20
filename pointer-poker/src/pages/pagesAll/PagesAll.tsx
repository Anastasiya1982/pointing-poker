import { Route, Switch, useLocation } from 'react-router-dom';
import Main from '../Main/Main';
import LobbyPage from '../LobbyPage/LobbyPage';
import React from 'react';

const PagesAll = () => {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/lobby">
          <LobbyPage />
        </Route>
      </Switch>
    </div>
  );
};

export default PagesAll;
