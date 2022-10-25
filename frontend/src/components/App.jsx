import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Home = () => (
  <>
    <h1>Welcome to the chat!</h1>
    <Link to="/login">Login</Link>
  </>
);

const schema = yup.object().shape({
  username: yup.string().required('Required!'),
  password: yup.string().min(3, 'Too Short!').max(30, 'Too Long!!').required('Required!'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: () => console.log('u pressed button!'),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input name="username" required="" placeholder="Ваш ник" id="username" className="form-control" value="" />
      </div>
      <div className="form-floating mb-4">
        <input name="password" required="" placeholder="Пароль" type="password" id="password" className="form-control" value="" />
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
      <Link to="/">Go Home</Link>
    </form>
  );
};

const PageNotFound = () => (
  <div>
    <h1>404 Error</h1>
    <h1>Page not found</h1>
    <Link to="/">Go to the start page!</Link>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
