import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ParticipantsPage from './ParticipantsPage';
import TechniquesPage from './TechniquesPage';
import Header from './Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      title: 'React Starter',
      description:
        'A basic template that consists of the essential elements that are required to start building a React application'
    };
  }

  render() {
    const HeaderedRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => {
          return (
            <div className="contentWrapper" id="wrapper">
              <Header {...props} />
              <Component {...props} />
            </div>
          );
        }}
      />
    );
    return (
      <Router>
        <div>
          <HeaderedRoute exact path="/" component={MainPage} />
          <HeaderedRoute path="/participants" component={ParticipantsPage} />
          <HeaderedRoute path="/techniques" component={TechniquesPage} />
        </div>
      </Router>
    );
  }
}
