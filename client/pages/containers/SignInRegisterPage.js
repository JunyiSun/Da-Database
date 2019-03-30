import React, { Component } from 'react';

// Apis
import {postUserLogin, postUserRegister} from '../../API/api';

// Style sheets
import '../../layouts/containers/SignInRegisterPage.scss';
import '../../layouts/layoutClass.scss';

// Components
import Avatar from '../components/Avatar';

// Utilities functions
import { hashPassword } from "../../Utilities/utilities"

export default class SignInRegisterPage extends Component {
  constructor() {
    super();

    this.state = {
      email:"",
      password:"",
      confirmedPassword:"",
      gotoRegister:false
    }

    // onchange method handlers
    this.emailOnchange = this.emailOnchange.bind(this);
    this.passwordOnchange = this.passwordOnchange.bind(this);
    this.confirmedPasswordOnchange = this.confirmedPasswordOnchange.bind(this);
    
    // button handlers
    this.logInHandler = this.logInHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
    this.submitRegisterForm = this.submitRegisterForm.bind(this);
  }

  emailOnchange(e){
    e.preventDefault();
    let state = this.state;
    state.email = e.target.value
    this.setState(state);
  }

  passwordOnchange(e){
    e.preventDefault();
    let state = this.state;
    state.password = e.target.value
    this.setState(state);
  }

  confirmedPasswordOnchange(e){
    e.preventDefault();
    let state = this.state;
    state.confirmedPassword = e.target.value
    this.setState(state);
  }

  logInHandler(e){
    e.preventDefault();
    
    const user = {
      email: this.state.email,
      password: hashPassword(this.state.password)
    }
    
    postUserLogin(user, res => {
      if (res.error) { 
        alert(res.error);
      } else { 
        this.props.setUser(user);
      }
    })    
  }

  registerHandler(e){
    e.preventDefault();
    
    let state = this.state;
    if (state.gotoRegister){
      this.submitRegisterForm();
      return;
    }

    state.gotoRegister = true;
    this.setState(state);
  }

  submitRegisterForm(){
    let state = this.state;    
    if (state.password !== state.confirmedPassword){
      alert("Password not match");
      return;
    }

    const user = {
      email: state.email,
      password: hashPassword(state.password)
    }

    postUserRegister(user, res => {
      if (res.error) {
        alert(res.error);
      } else {
        state.gotoRegister = false;
        this.setState(state);
      }
    })
  }

  render() {
    const gotoRegister = this.state.gotoRegister;
    return (
      <div className="signIn-register-mask-layer flex-row-center-center" onClick={this.props.closePage}> 
        <div className="signIn-register-main-panel flex-col-center-around" onClick={e => e.stopPropagation()}>
          
          <Avatar/>
          
          <div className="signIn-content flex-col-center-around">
            <div className="login-input-wrapper flex-row">
              <i className="fas fa-envelope flex-row-center-center"/>
              <input type="text" placeholder="Email" onChange={this.emailOnchange}/>
            </div>
            <div className="login-input-wrapper flex-row">
              <i className="fas fa-lock flex-row-center-center"/>
              <input type="password" placeholder="Password" onChange={this.passwordOnchange}/>
            </div>
            {gotoRegister ? 
              <div className="login-input-wrapper flex-row">
                <i className="fas fa-lock flex-row-center-center"/>
                <input type="password" placeholder="Comfirm Your Password" onChange={this.confirmedPasswordOnchange}/>
              </div>:
              <div className="login-button-wrapper flex-row-center-between">
                <div className="login-button flex-row-center-center" onClick={this.logInHandler}>
                  <div>Log In</div>
                </div>
                <span onClick={() => alert("Please contact: (604) 473-9363")}>Forgot Password?</span>
              </div>
            }
          </div>
          
          <div className="division-line"></div>
          
          <div className="register-button flex-row-center-center" onClick={this.registerHandler}>
            <div>Register</div>
          </div>
        </div>
      </div>
    );
  }
}
