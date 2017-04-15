import React, { PropTypes } from 'react';
import Styles from './auth.scss';
import AuthLogin from './login';
import AuthRegister from './register';

class Auth extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isActiveLoginMode: true,
      isActiveRegisterMode: false,
      lastClickedButton: 'osp-chat-form-nav__btn--login'
    };

    this.changeAuthMode = this.changeAuthMode.bind(this);
  }

  render() {
    return (
      <div className="ct-auth">
        <h3 className="auth-title">Please login or register to enter chat</h3>
        <div className="osp-chat-form-wrap">
          <nav className="osp-chat-form-nav">
            <a className={"osp-chat-form-nav__btn  osp-chat-form-nav__btn--login " + (this.state.isActiveLoginMode ? 'active' : '')}
              onClick={this.changeAuthMode}>Login</a>
            <a className={"osp-chat-form-nav__btn  osp-chat-form-nav__btn--sign-in " + (this.state.isActiveRegisterMode ? 'active' : '')}
              onClick={this.changeAuthMode}>Register</a>
          </nav>
          <AuthLogin visible={this.state.isActiveLoginMode} />
          <AuthRegister visible={this.state.isActiveRegisterMode} />
        </div>
      </div>
    );
  }

  changeAuthMode(e) {
    let lastButtonClass = e.target.classList[1];
    if (this.state.lastClickedButton !== lastButtonClass) {
      this.setState({
        isActiveLoginMode: !this.state.isActiveLoginMode,
        isActiveRegisterMode: !this.state.isActiveRegisterMode,
        lastClickedButton: lastButtonClass
      })
    }

  }
}

Auth.defaultProps = {

};

Auth.propTypes = {

};

export default Auth;
