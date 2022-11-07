import { Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import routes from '../routes';

const NavBar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to={routes.rootPagePath()}>Chat</Link>
      <DropdownButton variant="outline-info" title="Язык" id="bg-nested-dropdown">
        <Dropdown.Item eventKey="1">ру</Dropdown.Item>
        <Dropdown.Item eventKey="2">en</Dropdown.Item>
      </DropdownButton>
    </div>
  </nav>
);

export default NavBar;
