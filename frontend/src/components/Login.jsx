import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const Login = () => {
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
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
        setAuthFailed(false);
        const { data } = await axios.post(routes.loginPath(), values);
        logIn(data);
        const { from } = location.state || { from: { pathname: routes.rootPagePath() } };
        navigate(from);
      } catch (err) {
        setAuthFailed(true);
        console.log(err);
        if (err.isAxiosError || err.responce.status === 401) {
          inputRef.current.select();
          return;
        }
        toast.warn(`${t('toast.errorLoadingData')}`);
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 add-margin-top">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./images/enter.jpg" className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('login.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="Ваш ник"
                    id="username"
                  />
                  <Form.Label htmlFor="username">{t('login.nameField')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                    name="password"
                    autoComplete="current-password"
                    required=""
                    placeholder="Пароль"
                    type="password"
                    id="password"
                  />
                  <Form.Label htmlFor="password">{t('login.passwordField')}</Form.Label>
                  {authFailed
                  && <div className="invalid-tooltip">{t('login.invalidData')}</div>}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.loginButton')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('login.questionAboutAccount')}</span>
                {' '}
                <Link to={routes.singUpPagePath()}>{t('login.registration')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
