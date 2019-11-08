import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import Nav from './components/Nav'
import Signup from './components/Signup'
import Settings from './components/Settings'




function App() {
  return (
    window.localStorage ? 
    <Router>
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
        <Route path="/crawls">
          <Nav />
          <Home />
        </Route>
        <Route path="/settings">
          <Nav />
          <Settings />
        </Route>
      </Switch>
    </Router>
    :
      <Router>
      <Switch>
        <Route exact path="/">
          <Signup />
        </Route>
      </Switch>
    </Router>

    // <Router>
    //   <div>
    //     <Nav />
    //     <Route path="/" component={Login} />
    //     <Route exact path="/home" component={Home} />
    //   </div>
    // </Router>

  );
}

export default App;
