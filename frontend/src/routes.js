const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  getDataPath: () => [apiPath, 'data'].join('/'),
  createNewUserPath: () => [apiPath, 'signup'].join('/'),
  rootPagePath: () => '/',
  loginPagePath: () => '/login',
  singUpPagePath: () => '/signup',
};
