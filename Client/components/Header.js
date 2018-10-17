import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <div className="header" id="header">
      <ul className="list-inline text-centered absoluted">
        <li
          className={`list-inline-item ${
            props.match.path === '/' ? 'active' : ''
          }`}
        >
          <Link to="/">Главная</Link>
        </li>
        <li
          className={`list-inline-item ${
            props.match.path === '/participants' ? 'active' : ''
          }`}
        >
          <Link to="/participants">Участники</Link>
        </li>
        <li
          className={`list-inline-item ${
            props.match.path === '/techniques' ? 'active' : ''
          }`}
        >
          <Link to="/techniques">Техника выполнения</Link>
        </li>
      </ul>
      <div className="d-sm-none d-md-block instawrapper">
        <a
          href="https://www.instagram.com/rdwcofficial/"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <div className="icon" />
          <span>Instagram</span>
        </a>
      </div>
    </div>
  );
};

Header.propTypes = {
  match: PropTypes.object,
};
export default Header;
