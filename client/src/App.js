import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'

import Nav from './components/Nav'
import Home from './components/Home'
import About from './components/About'
import UserDetail from './components/UserDetail'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <>
        <Router>
        <Nav />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/userdetail/:itemid" component={UserDetail} />
            
          </Switch>
        </div>
        <Footer />
        </Router>
      </>
    );
  }
}

export default App;