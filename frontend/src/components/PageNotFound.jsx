import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <>
    <h1>404 Error</h1>
    <h1>Page not found</h1>
    <Link to="/">Go to the start page!</Link>
  </>
);

export default PageNotFound;
