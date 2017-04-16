import React, { PropTypes } from 'react';

class AuthRegister extends React.Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <form className={"osp-chat-form  osp-chat-form--sign-in " + (this.props.visible ? 'active' : 'hidden')}>
        <input
          type="text"
          className="osp-chat-form__input"
          placeholder="Username" />
        <span className="osp-chat-form__hint" >Your name must be at least 6 latin characters and digits</span>
        <input
          type="email"
          className="osp-chat-form__input"
          placeholder="Email" />
        <span className="osp-chat-form__hint">Please enter valid email</span>
        <div className="osp-chat-form-group">
          <input
            type="password"
            className="osp-chat-form__input"
            placeholder="Enter password" />
          <span className="osp-chat-form__hint" >Your password must be at least 8 latin characters and digits</span>
          <input
            type="password"
            className="osp-chat-form__input"
            placeholder="Confirm password" />
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
