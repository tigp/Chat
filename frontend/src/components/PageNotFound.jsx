import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div>
    <h1>404 Error</h1>
    <h1>Page not found</h1>
    <Link to="/">Go to the start page!</Link>
  </div>
);

export default PageNotFound;
