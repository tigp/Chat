import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../routes';

const PageNotFound = () => (
  <div className="text-center">
    <h1 className="h4 text-muted">
      Страница не найдена
    </h1>
    <Link to={routes.rootPagePath()}>Но вы можете перейти на главную страницу</Link>
  </div>
);

export default PageNotFound;
