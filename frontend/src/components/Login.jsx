import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import routes from '../routes.js'; // routes.loginPath()
import useAuth from '../hooks/index.jsx';

const Login = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required('Please enter username'),
      password: yup.string().required('Please enter password'),
    }),
    onSubmit: async (values) => {
      try {
        auth.setUserData({ authState: true });

        const { data } = await axios.post(routes.loginPath(), values); // => { token, username }
        if (data.token && data.username) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          navigate('/');
        }
      } catch (err) {
        auth.setUserData({ authState: false });
        if (err.isAxiosError || err.responce.status === 401) {
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src="./images/enter.jpg"
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    onChange={formik.handleChange}
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                    className={
                      auth.authState
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={formik.values.username}
                  />
                </div>
                <div className="form-floating mb-4">
                  <input
                    onChange={formik.handleChange}
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    className={
                      auth.authState
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    value={formik.values.password}
                  />
                  {auth.authState && <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет акаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
