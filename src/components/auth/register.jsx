import React, { PropTypes } from 'react';

class AuthRegister extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <form
        novalidate
        className="osp-chat-form  osp-chat-form--sign-in">
        <input
          type="text"
          className="osp-chat-form__input"
          placeholder="Username"
          formControlName="name" />
        <span className="osp-chat-form__hint" >Your name must be at least 6 latin characters and digits</span>
        <input
          type="email"
          className="osp-chat-form__input"
          placeholder="Email"
          formControlName="email" />
        <span className="osp-chat-form__hint">Please enter valid email</span>
        <div className="osp-chat-form-group" formGroupName="passwords">
          <input
            type="password"
            className="osp-chat-form__input"
            placeholder="Enter password"
            formControlName="password" />
          <span className="osp-chat-form__hint" >Your password must be at least 8 latin characters and digits</span>
          <input
            type="password"
            className="osp-chat-form__input"
            placeholder="Password"
            formControlName="passwordConfirmed" />
          <span className="osp-chat-form__hint" >The passwords are not identical</span>
        </div>

        <input type="submit"
          className="osp-chat-form__submit  osp-chat-form__submit--sign-in"
          value="Sign-in" />
      </form>
    );
  }
}

AuthRegister.defaultProps = {

};

AuthRegister.propTypes = {

};

export default AuthRegister;
