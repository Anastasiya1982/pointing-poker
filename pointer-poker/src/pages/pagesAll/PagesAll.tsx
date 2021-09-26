import { Route, Switch} from 'react-router';
import React from 'react';
import Main from '../Main/Main';
import LobbyPage from '../LobbyPage/LobbyPage';
import GamePageMaster from '../gamePageMaster/GamePageMaster';
import ResultPage from '../resultPage/ResultPage';

const PagesAll = () => {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/lobby" component={LobbyPage} />
        <Route path="/game" component={GamePageMaster} />
        <Route path="/results" component={ResultPage} />
      </Switch>
    </div>
  );
};

export default PagesAll;
