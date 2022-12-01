import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../routes';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center page-404-margin-top">
      <h1 className="h4 text-muted">
        {t('pageNotFound.header')}
      </h1>
      <Link to={routes.rootPagePath()}>{t('pageNotFound.link')}</Link>
    </div>
  );
};

export default PageNotFound;
