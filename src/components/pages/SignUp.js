import React, { useState, useEffect } from 'react';
import '../../App.css';
import './SignUp.css';
import validate from '../utility/validateInfo';
import { Auth } from 'aws-amplify';

export default function SignUp(props) {

  const [submitClicked, setSubmitClicked] = useState(false);
  const [errors, setErrors] = useState({
    inputFormErrors: {},
    cognitoErrors: {}
  });
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  async function ExecuteCognitoSignUp (username, email, password) {
    try {
      var signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      });
      setErrors({...errors, cognitoErrors: {}});
    } catch(error){
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      setErrors({...errors, cognitoErrors: err});
    }
  }

  useEffect(
    () => {
      console.log(errors.inputFormErrors);
      console.log(errors.cognitoErrors);
      console.log(submitClicked);
      if (Object.keys(errors.inputFormErrors).length === 0 && 
          Object.keys(errors.cognitoErrors).length === 0 &&
          submitClicked) {
            props.history.push("/signupSuccess");
      }
    },
    [errors]
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSubmitClicked(true);
    let validateResult = validate(values);
    setErrors({...errors, inputFormErrors : validateResult});

    if (Object.keys(validateResult).length === 0){
      ExecuteCognitoSignUp(values.username, values.email, values.password);
    }
}

  return (
    <div className="signUp">
      <div className='form-container'>
        <form className='form' onSubmit={handleSubmit} noValidate>
          <h1>
            Get started with us today! 
          </h1>
          <div className='form-inputs'>
          {errors.cognitoErrors && <p>{errors.cognitoErrors.message}</p>}
            <label className='form-label'>Username</label>
            <input
              className='form-input'
              type='text'
              name='username'
              placeholder='Enter your username'
              value={values.username}
              onChange={handleChange}
            />
            {errors.inputFormErrors.username && <p>{errors.inputFormErrors.username}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Email</label>
            <input
              className='form-input'
              type='email'
              name='email'
              placeholder='Enter your email'
              value={values.email}
              onChange={handleChange}
            />
            {errors.inputFormErrors.email && <p>{errors.inputFormErrors.email}</p>}
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
            {errors.inputFormErrors.password && <p>{errors.inputFormErrors.password}</p>}
          </div>
          <div className='form-inputs'>
            <label className='form-label'>Confirm Password</label>
            <input
              className='form-input'
              type='password'
              name='password2'
              placeholder='Confirm your password'
              value={values.password2}
              onChange={handleChange}
            />
            {errors.inputFormErrors.password2 && <p>{errors.inputFormErrors.password2}</p>}
          </div>
          <button className='form-input-btn' type='submit'>
            Sign up
          </button>
          <span className='form-input-login'>
            Already have an account? Login 
            <a href='/login'>here</a>
          </span>
        </form>
      </div>
    </div>
  )
}
