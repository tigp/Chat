import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';

import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const Registration = () => {
  const { logIn } = useAuth();
  const { t } = useTranslation();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [authExists, setAuthExists] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, [authExists]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .trim()
        .required(t('errors.required'))
        .min(3, t('errors.min3'))
        .max(20, t('errors.max20')),

      password: yup
        .string()
        .trim()
        .required(t('errors.required'))
        .min(6, t('errors.min6')),

      confirmPassword: yup
        .string()
        .trim()
        .required(t('errors.required'))
        .oneOf([yup.ref('password'), null], t('errors.confPassword')),
    }),
    onSubmit: async (values) => {
      try {
        setRegistrationFailed(false);
        setAuthExists(false);
        const newUser = { username: values.username, password: values.password };
        const { data } = await axios.post(routes.createNewUserPath(), newUser);
        logIn(data);
        navigate(routes.rootPagePath());
      } catch (err) {
        if (err.response.status === 409) {
          setAuthExists(true);
          setRegistrationFailed(true);
        } else {
          toast.warn(`${t('toast.errorLoadingData')}`);
        }
        setRegistrationFailed(true);
        console.log(err);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 add-margin-top">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src="./images/registration.jpg"
                  className="rounded-circle"
                  alt="text"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('registration.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.username || registrationFailed}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="От 3 до 20 символов"
                    id="username"
                  />
                  <Form.Label htmlFor="username">{t('registration.nameField')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.password || registrationFailed}
                    name="password"
                    autoComplete="password"
                    required=""
                    placeholder="Не менее 6 символов"
                    id="password"
                    type="password"
                  />
                  <Form.Label htmlFor="password">{t('registration.passwordField')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                    isInvalid={formik.errors.confirmPassword || registrationFailed}
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    required=""
                    placeholder="Пароли должны совпадать"
                    id="confirmPassword"
                    type="password"
                  />
                  <Form.Label htmlFor="confirmPassword">{t('registration.confirmPasswordField')}</Form.Label>
                  <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  {authExists
                  && <div className="invalid-tooltip">{t('registration.invalidData')}</div>}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 btn">{t('registration.registrationButton')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
