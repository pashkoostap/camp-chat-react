import React, { PropTypes } from 'react';
import Styles from './auth.scss';
import AuthLogin from './login';
import AuthRegister from './register';

class Auth extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <div className="ct-auth">
        <h3 className="auth-title">Please login or register to enter chat</h3>
        <div className="osp-chat-form-wrap">
          <nav className="osp-chat-form-nav">
            <a className="osp-chat-form-nav__btn  osp-chat-form-nav__btn--login">Login</a>
            <a className="osp-chat-form-nav__btn  osp-chat-form-nav__btn--sign-in">Register</a>
          </nav>
          <AuthLogin />
          <AuthRegister />
        </div>
      </div>
    );
  }
}

Auth.defaultProps = {

};

Auth.propTypes = {

};

export default Auth;
