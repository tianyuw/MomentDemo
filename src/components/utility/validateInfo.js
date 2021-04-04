export default function validateInfo(values) {
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = 'Username required';
    } else if (values.username.length < 6) {
      errors.username = 'Username needs to be 6 characters or more';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Email required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password needs to be 6 characters or more';
    } else if (!values.password.match(/[a-z]+/)) {
      errors.password = 'Password needs to have at least one lower case character';
    } else if (!values.password.match(/[0-9]+/)) {
      errors.password = 'Password needs to have at least one number';
    } else if (!values.password.match(/[A-Z]+/)) {
      errors.password = 'Password needs to have at least one upper case character';
    }
  
    if (!values.password2) {
      errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Passwords do not match';
    }
    return errors;
  }