import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';

const Header = props => {
  return (
    <Menu>
      <ul className="mobile-menu-list">
        <li className={`menu-item ${props.match.path === '/' ? 'active' : ''}`}>
          <Link to="/">Главная</Link>
        </li>
        <li
          className={`menu-item ${
            props.match.path === '/participants' ? 'active' : ''
          }`}
        >
          <Link to="/participants">Участники</Link>
        </li>
        <li
          className={`menu-item ${
            props.match.path === '/techniques' ? 'active' : ''
          }`}
        >
          <Link to="/techniques">Техника выполнения</Link>
        </li>
      </ul>
    </Menu>
  );
};

Header.propTypes = {
  match: PropTypes.object
};
export default Header;
