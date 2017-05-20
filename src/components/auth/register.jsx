import React, { PropTypes } from 'react';
import { API_CONFIG } from '../../api/api-config';
import * as validators from '../../utils/validators';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  photo: '',
  photoLoadingHint: '',
  isPhotoLoading: false,
  labelFileInputValut: 'Upload photo',
  isUserNameValid: null,
  isUserNameTouched: false,
  isUserEmailValid: null,
  isUserEmailTouched: false,
  isUserPasswordValid: null,
  isUserPasswordTouched: false,
  isUserConfirmedPasswordValid: null,
  isUserConfirmedPasswordTouched: false,
  isRegisterHintVisible: null,
  registerHint: 'This username or email is already used'
}

class AuthRegister extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   username: '',
    //   email: '',
    //   password: '',
    //   confirmPassword: '',
    //   photo: '',
    //   photoLoadingHint: '',
    //   isPhotoLoading: false,
    //   labelFileInputValut: 'Upload photo',
    //   isUserNameValid: null,
    //   isUserNameTouched: false,
    //   isUserEmailValid: null,
    //   isUserEmailTouched: false,
    //   isUserPasswordValid: null,
    //   isUserPasswordTouched: false,
    //   isUserConfirmedPasswordValid: null,
    //   isUserConfirmedPasswordTouched: false,
    //   isRegisterHintVisible: null,
    //   registerHint: 'This username or email is already used'
    // }
    this.state = initialState;
    this.setInputValue = this.setInputValue.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.validateUserName = this.validateUserName.bind(this);
    this.validateUserEmail = this.validateUserEmail.bind(this);
    this.validateUserPassword = this.validateUserPassword.bind(this);
    this.validateUserConfirmedPassword = this.validateUserConfirmedPassword.bind(this);
  }
  render() {
    return (
      <form className={"osp-chat-form  osp-chat-form--sign-in " + (this.props.visible ? 'active' : 'hidden')}>
        <input
          type="text"
          className="osp-chat-form__input"
          value={this.state.username}
          name="username"
          onChange={this.setInputValue}
          onBlur={this.validateUserName}
          placeholder="Username" />
        <span className={"osp-chat-form__hint " + (this.state.isUserNameValid || !this.state.isUserNameTouched ? ' hidden' : ' visible')}>Your name must be at least 6 latin characters and digits</span>

        <input
          type="text"
          className="osp-chat-form__input"
          value={this.state.email}
          name="email"
          onChange={this.setInputValue}
          onBlur={this.validateUserEmail}
          placeholder="Email" />
        <span className={"osp-chat-form__hint " + (this.state.isUserEmailValid || !this.state.isUserEmailTouched ? ' hidden' : ' visible')}>Please enter valid email</span>

        <label className='new-chat-form__input  new-chat-form__input--label-file' onChange={(e) => { this.onFileUpload(e) }}>
          {this.state.labelFileInputValut}
          <input type='file' className='new-chat-form__input  new-chat-form__input--file' />
        </label>
        <span className='new-chat-form__hint'>{this.state.photoLoadingHint}</span>

        <input
          type="password"
          className="osp-chat-form__input"
          value={this.state.password}
          name="password"
          onChange={this.setInputValue}
          onBlur={this.validateUserPassword}
          placeholder="Enter password" />
        <span className={"osp-chat-form__hint " + (this.state.isUserPasswordValid || !this.state.isUserPasswordTouched ? ' hidden' : ' visible')}>Your password must be at least 6 latin characters and digits</span>

        <input
          type="password"
          className="osp-chat-form__input"
          value={this.state.confirmPassword}
          name="confirmPassword"
          onChange={(e) => { this.setInputValue(e); this.validateUserConfirmedPassword(e) }}
          placeholder="Confirm password" />
        <span className={"osp-chat-form__hint " + (this.state.isUserConfirmedPasswordValid || !this.state.isUserConfirmedPasswordTouched ? ' hidden' : ' visible')}>The passwords are not identical</span>

        <span className={'new-chat-form__hint' + (this.state.isRegisterHintVisible ? ' visible' : ' hidden')}>{this.state.registerHint}</span>

        <input type="submit"
          className="osp-chat-form__submit  osp-chat-form__submit--sign-in"
          onClick={this.signUp}
          value="Register"
          disabled={!this.state.isUserNameValid || !this.state.isUserEmailValid || !this.state.isUserEmailValid || !this.state.isUserConfirmedPasswordValid} />
      </form>
    );
  }

  setInputValue(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  validateUserName(e) {
    let isValid = validators.validateString(e.target.value, 6);
    this.setState((state, props) => { return { isUserNameValid: isValid, isUserNameTouched: true } })
  }

  validateUserEmail(e) {
    let isValid = validators.validateEmail(e.target.value);
    this.setState((state, props) => { return { isUserEmailValid: isValid, isUserEmailTouched: true } })
  }

  validateUserPassword(e) {
    let isValid = validators.validateString(e.target.value, 6);
    this.setState((state, props) => { return { isUserPasswordValid: isValid, isUserPasswordTouched: true } })
  }

  validateUserConfirmedPassword(e) {
    let confirmedPassword = e.target.value;
    if (confirmedPassword == this.state.password) {
      this.setState((state, props) => { return { isUserConfirmedPasswordValid: true, isUserConfirmedPasswordTouched: true } })
    } else {
      this.setState((state, props) => { return { isUserConfirmedPasswordValid: false, isUserConfirmedPasswordTouched: true } })
    }
  }

  onFileUpload(event) {
    let input = event.target;
    let file = input.files[0];
    if (file.type.match('image/*')) {
      this.setState((state, props) => {
        return {
          isPhotoLoading: true,
          photoLoadingHint: 'Photo is uploading now',
          labelFileInputValut: file.name
        }
      })
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        let body = JSON.stringify({ image: reader.result });
        let init = {
          method: 'post',
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          body
        }
        window.fetch(API_CONFIG.UPLOAD_IMAGE, init)
          .then(res => res.json())
          .then(resObj => {
            this.setState((state, props) => {
              return {
                photoLoadingHint: 'Photo was successfully uploaded',
                photo: resObj.secure_url
              }
            })
          })
      };
    } else {
      this.setState((state, props) => {
        return {
          isPhotoLoading: true,
          photoLoadingHint: 'File must be an image'
        }
      })
    }
  }

  signUp(e) {
    e.preventDefault();
    let myHeaders = new Headers();
    myHeaders.set('Content-Type', 'application/json');

    let myInit = {
      method: 'post',
      headers: myHeaders,
      mode: 'cors',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        photo: this.state.photo
      })
    }
    fetch(API_CONFIG.SIGNUP, myInit)
      .then((res) => res.json())
      .then(res => {
        if (res.status == 400) {
          this.setState((state, props) => {
            return {
              isRegisterHintVisible: true,
              registerHint: 'This username or email is already used'
            }
          })
        } else {
          this.setState(initialState)
          this.props.switchToLogin();
        }
      })
  }
}

export default AuthRegister;
