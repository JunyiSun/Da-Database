import React, { Component } from 'react';

// Style sheets
import '../../layouts/containers/UserPage.scss';
import '../../layouts/layoutClass.scss';

// import pages
import UserDashBoard from './UserDashBoard';
import FocusPage from './FocusPage';
import EditPage from './EditPage';
import ChangePassword from './ChangePassword';

// mock data
const user = {
  name: "Norman Sherd",
  email: "123@456.com",
  image: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201606271147",
  pv: 10,
  role: 1,
  skills: [],
  industries: [],
  interests: [],
  description: ""
}

const counts = {
  makers: 0,
  requesters: 0,
  projects: 0,
  events: 0
}

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderStatus: {
        renderDashBoard: true,
        renderEditUser: false,
        renderFocusList: false
      },
      counts: counts,
      user: user,
      changePassword: false
    }

    this.renderPage = this.renderPage.bind(this);
    this.switchPage = this.switchPage.bind(this);
    this.updateUser = this.updateUser.bind(this);


    this.closeChangePasswordPage = this.closeChangePasswordPage.bind(this);
    this.openResetPassword = this.openResetPassword.bind(this);
  }

  updateUser(user){
    let state = this.state;
    state.user = user;
    this.setState(state);
  }

  switchPage(page){
    let state = this.state;
    let renderState = {
      renderDashBoard: false,
      renderEditUser: false,
      renderFocusList: false
    }

    switch(page){
      case "Edit":
        renderState.renderEditUser = true;
        break;
      case "Focus":
        renderState.renderFocusList = true;
        break;
      default: 
        renderState.renderDashBoard = true;
        break;
    }

    state.renderStatus = renderState;
    this.setState(state);
  }

  closeChangePasswordPage(){
    let state = this.state;
    state.changePassword = false;
    this.setState(state);
  }  

  openResetPassword(e){
    e.preventDefault();
    let state = this.state;
    state.changePassword = true;
    this.setState(state);
  }

  renderPage(){
    const renderStatus  = this.state.renderStatus;
    if(renderStatus.renderDashBoard){
      return(<UserDashBoard switchPage={this.switchPage} user={this.state.user} counts={this.state.counts}/>)
    } else if (renderStatus.renderEditUser) {
      return(<EditPage switchPage={this.switchPage} updateUser={this.updateUser} user={this.state.user} openResetPassword={this.openResetPassword}/>);
    } else if (renderStatus.renderFocusList) {
      return(<FocusPage switchPage={this.switchPage}/>);
    } else {
      return(<div>Error</div>);
    }
  }

  render() {
    return (
      <div className="user-content flex-col-center">
        {this.renderPage()}
        {this.state.changePassword && <ChangePassword closePage={this.closeChangePasswordPage} user={this.state.user}/>}
      </div>
    );
  }
}
