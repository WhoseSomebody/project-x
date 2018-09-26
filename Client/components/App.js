import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import Popup from 'react-popup';
import MainPage from './MainPage';
import ParticipantsPage from './ParticipantsPage';
import TechniquesPage from './TechniquesPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import Header from './Header';
import MobileHeader from './MobileHeader';
export default class App extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Dream Workout Championship',
      description:
        'Главный турнир по воркауту в СНГ, цель которого дать возможность каждому выйти на поле битвы и доказать что он номер один в своем деле!'
    };
  }

  render() {
    const HeaderedRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => {
          return (
            <div className="contentWrapper" id="wrapper">
              
              <MobileHeader {...props}/>
              <Header {...props} />
              <Component {...props} />
              <Popup />
            </div>
          );
        }}
      />
    );
    const AdminRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => {
          return (
            <div className="contentWrapper" id="wrapper">
              <div className="headingTitle">
                <span className="left">RDTeam</span>
                Admin
              </div>
              <Component {...props} />
              <Popup />
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
          <AdminRoute path="/login" component={LoginPage} />
          <AdminRoute
            path="/admin-panel"
            component={
              Cookies.get('isLoggedIn')
                ? AdminPage
                : () => <Redirect to="/login" />
            }
          />
        </div>
      </Router>
    );
  }
}

Popup.registerPlugin('popover', function(content, target) {
  this.create({
    content: content,
    className: 'popover',
    noOverlay: true,
    position: function(box) {
      let bodyRect = document.body.getBoundingClientRect();
      let btnRect = target.getBoundingClientRect();
      let btnOffsetTop = btnRect.top - bodyRect.top;
      let btnOffsetLeft = btnRect.left - bodyRect.left;
      let scroll =
        document.documentElement.scrollTop || document.body.scrollTop;

      box.style.top = btnOffsetTop - box.offsetHeight - 10 - scroll + 'px';
      box.style.left =
        btnOffsetLeft + target.offsetWidth / 2 - box.offsetWidth / 2 + 'px';
      box.style.margin = 0;
      box.style.opacity = 1;
    }
  });
});
