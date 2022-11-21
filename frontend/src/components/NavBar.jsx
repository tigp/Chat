import React from 'react';
import { Link } from 'react-router-dom';

import AuthButton from './AuthButton.jsx';
import routes from '../routes';

const NavBar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to={routes.rootPagePath()}>Chat</Link>
      <AuthButton />
    </div>
  </nav>
);

export default NavBar;
