import React, { useEffect, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

const Registration = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ username: name, password, confirmPassword }) => {
      console.log(`${name} ${password} ${confirmPassword}`);
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
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={authFailed}
                    name="username"
                    autoComplete="username"
                    required=""
                    placeholder="От 3 до 20 символов"
                    id="username"
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={authFailed}
                    name="password"
                    autoComplete="password"
                    required=""
                    placeholder="Не менее 6 символов"
                    id="password"
                    type="password"
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={authFailed}
                    name="confirmPassword"
                    autoComplete="confirmPassword"
                    required=""
                    placeholder="Пароли должны совпадать"
                    id="confirmPassword"
                    type="password"
                  />
                  <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 btn">Войти</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
