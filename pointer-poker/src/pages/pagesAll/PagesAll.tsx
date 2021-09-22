import { Route, Switch} from 'react-router-dom';
import React from 'react';
import Main from '../Main/Main';
import LobbyPage from '../LobbyPage/LobbyPage';
import GamePageMaster from '../gamePageMaster/GamePageMaster';


const PagesAll = () => {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/lobby" component={LobbyPage} />
        <Route path="/game" component={GamePageMaster} />
      </Switch>
    </div>
  );
};

export default PagesAll;
