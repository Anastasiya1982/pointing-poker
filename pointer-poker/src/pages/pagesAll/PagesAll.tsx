import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Main from '../Main/Main';
import LobbyPage from '../LobbyPage/LobbyPage';

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
