import React, { useState } from 'react';
import '../../App.css';
import './LogIn.css';
import { Auth } from 'aws-amplify';

export default function LogIn(props) {

  const [cognitoErrors, setCognitoErrors] = useState({});

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(values.username, values.password);
      console.log(user);
      props.auth.configAuthState(true);
      props.auth.configUser(user);
      props.history.push("/");
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      setCognitoErrors(err);
    }
  }

  return (
    <div className="logIn">
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit} noValidate>
          <h1>
            Login to your account!
          </h1>
          <div className='form-inputs'>
            {cognitoErrors && <p>{cognitoErrors.message}</p>}
            <label className='form-label'>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              placeholder="Enter username or email"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Password</label>
            <input
              className='form-input'
              type='password'
              name='password'
              placeholder='Enter your password'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <span className='form-input-forgotPassword'>
            Forgot your password? click
            <a href="/forgotpassword">here</a>
          </span>
          <button className='form-input-btn' type='submit'>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
