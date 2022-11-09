import { Link } from 'react-router-dom';
import {
  DropdownButton,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import routes from '../routes';

const NavBar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <Link className="navbar-brand" to={routes.rootPagePath()}>Chat</Link>
      <ButtonGroup>
        <DropdownButton as={ButtonGroup} title="Язык" id="bg-nested-dropdown" variant="info">
          <Dropdown.Item eventKey="1">ру</Dropdown.Item>
          <Dropdown.Item eventKey="2">en</Dropdown.Item>
        </DropdownButton>
        <Button variant="success">Выйти</Button>
      </ButtonGroup>
    </div>
  </nav>
);

export default NavBar;
