export const validateString = (str, minLength) => {
  // checking for white spaces in username
  let replacedStr = str.replace(/\s/g, '').length;
  if (typeof str === 'string' && str.length >= minLength && replacedStr) {
    return true;
  } else {
    return false;
  }
}

export const validateEmail = (email) => {
  let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (typeof email === 'string' && email.match(pattern)) {
    return true;
  } else {
    return false;
  }
}
