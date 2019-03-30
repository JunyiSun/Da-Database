import React, { Component } from 'react';

// style setting for this page
import '../layouts/app.scss';
import '../layouts/layoutClass.scss';

// import all required containers here
import LandingPage from './containers/LandingPage';
import UserPage from './containers/UserPage';
import ConnectPage from './containers/ConnectPage';
import AboutPage from './containers/AboutPage';
import SignInRegisterPage from './containers/SignInRegisterPage';

// import all required components here
import NavBar from './components/NavBar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      curNavIndex: 'connect',
      logInState: false,
      showSignInPage: false,
      curUser: {}
    };

    this.setNavIndex = this.setNavIndex.bind(this);
    this.renderNavContent = this.renderNavContent.bind(this);
    this.closeLogInPage = this.closeLogInPage.bind(this);
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setNavIndex(navIndex) {
    const { state } = this;

    if (navIndex === 'user') {
      if (!state.logInState) {
        state.showSignInPage = true;
        this.setState(state);
        return;
      }
    } 
    
    state.curNavIndex = navIndex;
    if (navIndex === 'exit') {
      state.curNavIndex = 'landing';
      state.logInState = false;
    } else {
      if (!state.logInState) {
        state.showSignInPage = false;
      }
    }

    this.setState(state);
  }

  closeLogInPage(e){
    e.preventDefault();
    
    let state = this.state;
    state.showSignInPage = false;
    this.setState(state);
  }

  renderNavContent() {
    const { curNavIndex } = this.state;

    switch(curNavIndex){
      case 'landing': return (<LandingPage />);
      case 'user': return (<UserPage />);
      case 'connect': return (<ConnectPage />);
      case 'about': return (<AboutPage />);
      case 'exit': return (<LandingPage />);;
      default: return (<div />);
    }
  }

  setCurrentUser(user){
    let state = this.state;
    state.curUser = user;
    state.showSignInPage = false;
    state.logInState = true;
    this.setState(state);
  }

  render() {
    const { logInState, curNavIndex } = this.state;

    return (
      <div id="app-container" className="flex-row">
        <NavBar switchNavBar={this.setNavIndex} logInState={logInState} curNavIndex={curNavIndex} />
        {this.state.showSignInPage && <SignInRegisterPage closePage={this.closeLogInPage} setUser={this.setCurrentUser}/>}
        <div id="app-content">
          {this.renderNavContent()}
        </div>
      </div>
    );
  }
}
