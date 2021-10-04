import { Route, Switch} from 'react-router';
import React, { useEffect } from 'react';
import Main from '../Main/Main';
import LobbyPage from '../LobbyPage/LobbyPage';
import GamePageMaster from '../gamePageMaster/GamePageMaster';
import ResultPage from '../resultPage/ResultsPage';
import socket from '../../socket';
import { setIssues } from '../../redux/issue/issueReducer';
import { useDispatch } from 'react-redux';

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
