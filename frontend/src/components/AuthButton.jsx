import React from 'react';
import {
  DropdownButton,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import useAuth from '../hooks/index.jsx';

const AuthButton = () => {
  const { user, logOut } = useAuth();

  return (
    <ButtonGroup>
      <DropdownButton as={ButtonGroup} title="Язык" id="bg-nested-dropdown" variant="info">
        <Dropdown.Item eventKey="1">ру</Dropdown.Item>
        <Dropdown.Item eventKey="2">en</Dropdown.Item>
      </DropdownButton>
      {user && <Button variant="success" onClick={() => logOut()}>Выйти</Button>}
    </ButtonGroup>
  );
};

export default AuthButton;
