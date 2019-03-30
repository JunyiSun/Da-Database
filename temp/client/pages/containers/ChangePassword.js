import React, { Component } from 'react';

// Apis
// import {postUserLogin, postUserRegister} from '../../API/api';

// Style sheets
import '../../layouts/containers/SignInRegisterPage.scss';
import '../../layouts/layoutClass.scss';

// Components
import Avatar from '../components/Avatar';

// Utilities functions
import { hashPassword } from "../../Utilities/utilities"

export default class ChangePassword extends Component {
  constructor() {
    super();

    this.state = {
      prevPassword:"",
      newPassword:"",
      confirmedPassword:""
    }

    // onchange method handlers
    this.prevPasswordOnchange = this.prevPasswordOnchange.bind(this);
    this.newPasswordOnchange = this.newPasswordOnchange.bind(this);
    this.confirmedPasswordOnchange = this.confirmedPasswordOnchange.bind(this);
    
    // button handlers
    this.submitChanges = this.submitChanges.bind(this);
  }

  prevPasswordOnchange(e){
    e.preventDefault();
    let state = this.state;
    state.prevPassword = e.target.value
    this.setState(state);
  }

  newPasswordOnchange(e){
    e.preventDefault();
    let state = this.state;
    state.newPassword = e.target.value
    this.setState(state);
  }

  confirmedPasswordOnchange(e){
    e.preventDefault();
    let state = this.state;
    state.confirmedPassword = e.target.value
    this.setState(state);
  }

  submitChanges(){
    let state = this.state;    
    if (state.newPassword !== state.confirmedPassword){
      alert("Password not match");
      return;
    }
    alert("Success")
    this.props.closePage();

    // todo
  }

  render() {
    const {user} = this.props;

    return (
      <div className="signIn-register-mask-layer flex-row-center-center" onClick={this.props.closePage}> 
        <div className="signIn-register-main-panel flex-col-center-around" onClick={e => e.stopPropagation()}>
          
          <Avatar image={user.image}/>
          
          <div className="signIn-content flex-col-center-around">
            <div className="login-input-wrapper flex-row">
              <i class="fas fa-unlock flex-row-center-center"/>
              <input type="password" placeholder="Old Password" onChange={this.prevPasswordOnchange}/>
            </div>
            <div className="login-input-wrapper flex-row">
              <i className="fas fa-lock flex-row-center-center"/>
              <input type="password" placeholder="Password" onChange={this.newPasswordOnchange}/>
            </div>
            <div className="login-input-wrapper flex-row">
              <i className="fas fa-lock flex-row-center-center"/>
              <input type="password" placeholder="Comfirm Your Password" onChange={this.confirmedPasswordOnchange}/>
            </div>
          </div>
          
          <div className="division-line"></div>
          
          <div className="register-button flex-row-center-center" onClick={this.submitChanges}>
            <div>Change</div>
          </div>
        </div>
      </div>
    );
  }
}
