import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parallax from 'parallax-js';
import Cookies from 'js-cookie';

const CREDENTIALS = {
  login: 'rdteam',
  pwd: 'ProjectX2018'
};

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    };
  }

  componentDidMount() {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene); // eslint-disable-line
  }

  validateCredentials = () => {
    return (
      this.state.login === CREDENTIALS.login &&
      this.state.password === CREDENTIALS.pwd
    );
  };

  login = () => {
    if (this.validateCredentials()) {
      this.setState(
        {
          loginError: false
        },
        () => {
          Cookies.set('isLoggedIn', true, { expires: 1 });
          this.props.history.push('/admin-panel');
        }
      );
    } else {
      this.setState({
        loginError: true
      });
    }
  };

  render() {
    return (
      <div className="login-page">
        <div data-relative-input="true" id="scene" className="parallax">
          <div data-depth="0.1" className="Black" />
          <div data-depth="0.3" className="Gray" />
          <div data-depth="0.5" className="White" />
          <div data-depth="0.7" className="Violet" />
        </div>
        <div className="login-card">
          <div className="login-card-header">
            <h4>Введите логин и пароль для входа</h4>
          </div>
          <div className="login-card-body">
            <div className="feedback-form">
              <div className="row input-pair">
                <div className="col col-md-3 col-12">
                  <div className="title">Логин</div>
                </div>
                <div className="col col-md-9 col-12">
                  <div
                    className={`input-wrapper ${
                      this.state.loginError ? 'errored' : ''
                    }`}
                  >
                    <input
                      type="text"
                      value={this.state.pullUpLink}
                      onChange={e => this.setState({ login: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row input-pair">
                <div className="col col-md-3 col-12">
                  <div className="title">Пароль</div>
                </div>
                <div className="col col-md-9 col-12">
                  <div
                    className={`input-wrapper ${
                      this.state.loginError ? 'errored' : ''
                    }`}
                  >
                    <input
                      type="password"
                      value={this.state.password}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="login-card-footer">
            <div className="row">
              <div className="col-12">
                <a className="button button-main m-auto" onClick={this.login}>
                  Отправить
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
LoginPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default LoginPage;
