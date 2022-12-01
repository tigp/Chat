import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  DropdownButton,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { t, i18n } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to={routes.rootPagePath()}>{t('navBar.chatLinks')}</Link>
        {user && <b>{`Welcome ${user.username}!`}</b>}
        <ButtonGroup>
          <DropdownButton as={ButtonGroup} title={t('navBar.languageSelection')} id="bg-nested-dropdown" variant="info">
            <Dropdown.Item eventKey="1" onClick={() => i18n.changeLanguage('ru')}>{t('navBar.ru')}</Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => i18n.changeLanguage('en')}>{t('navBar.en')}</Dropdown.Item>
          </DropdownButton>
          {user && <Button variant="success" onClick={() => logOut()}>{t('navBar.logoutButton')}</Button>}
        </ButtonGroup>
      </div>
    </nav>
  );
};

export default NavBar;
