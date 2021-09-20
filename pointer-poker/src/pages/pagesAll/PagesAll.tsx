import { Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Main from "../Main/Main";
import LobbyPage from '../LobbyPage/LobbyPage';
import React from 'react';

const PagesAll = () => {
  // const location = useLocation();

  return (
    <div className="pages">
      {/*<TransitionGroup>*/}
      {/*  <CSSTransition timeout={300} classNames="page" key={location.key}>*/}
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/lobby" component={LobbyPage} />
          </Switch>
      {/*  </CSSTransition>*/}
      {/*</TransitionGroup>*/}
    </div>
  );
};

export default PagesAll;
