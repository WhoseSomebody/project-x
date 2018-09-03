import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  console.log(props);
  return (
    <div className="container">
      <ul className="list-inline text-centered header">
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
    </div>
  );
};

Header.propTypes = {
  match: PropTypes.object
};
export default Header;
