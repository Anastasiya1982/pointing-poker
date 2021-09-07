import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
// import ComponentForCheckingBackend from './pages/CheckngBackEnd/ComponentForCheckingBackend';
import Main from './pages/Main/Main';

import './styles.scss';

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

const PagesAll = () => {
  const location = useLocation();

  return (
    <div className="pages">
      <TransitionGroup>
        <CSSTransition timeout={300} classNames="page" key={location.key}>
          <Switch location={location}>
            <Route exact path="/">
              <Main />
            </Route>
            {/* <Route exact path="/about">
              <About />
            </Route>
            <Route path="/details/:title">
              <Details />
            </Route>
            <Route path="/error">
              <NotFound />
            </Route>
            <Redirect to="/error">
              <NotFound />
            </Redirect> */}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};