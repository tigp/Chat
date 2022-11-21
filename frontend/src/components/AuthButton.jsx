import React from 'react';
import {
  DropdownButton,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import useAuth from '../hooks/index.jsx';

const AuthButton = () => {
  const auth = useAuth();

  const handleButton = () => {
    auth.logOut();
    console.log('log Out!');
  };

  return (
    <ButtonGroup>
      <DropdownButton as={ButtonGroup} title="Язык" id="bg-nested-dropdown" variant="info">
        <Dropdown.Item eventKey="1">ру</Dropdown.Item>
        <Dropdown.Item eventKey="2">en</Dropdown.Item>
      </DropdownButton>
      <Button variant="success" onClick={handleButton}>
        {auth.loggedIn ? 'Войти' : 'Выйти'}
      </Button>
    </ButtonGroup>
  );
};

export default AuthButton;
