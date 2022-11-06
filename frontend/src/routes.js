const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  getDataPath: () => [apiPath, 'data'].join('/'),
  rootPagePath: () => '/',
  loginPagePath: () => '/login',
  singUpPagePath: () => '/signup',
};
