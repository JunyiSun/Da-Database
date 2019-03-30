import PropTypes from 'prop-types';
import React, { Component } from 'react';

// style setting for this page
import '../../layouts/layoutClass.scss';
import '../../layouts/components/NavBar.scss';

// import logo
import Logo from '../../icons/logo.svg';

export default class NavBar extends Component {
  render() {
    const { switchNavBar, curNavIndex, logInState } = this.props;
    return (
      <div id="nav-container" className="flex-col-center-between ">
        <div id="nav-list" className="flex-col">
          <div className={curNavIndex === 'landing' ? 'nav-icon-cointainer-active' : 'nav-icon-cointainer'} onClick={() => switchNavBar('landing')}>
            <div className="nav-icon-base-layer">
              <img className="nav-icon nav-logo" src={Logo} alt="logo" />
            </div>
          </div>
          <div className={curNavIndex === 'user' ? 'nav-icon-cointainer-active' : 'nav-icon-cointainer'} onClick={() => switchNavBar('user')}>
            <div className="nav-icon-base-layer">
              <i className="nav-icon nav-regular fas fa-user" alt="user" />
            </div>
          </div>
          <div className={curNavIndex === 'connect' ? 'nav-icon-cointainer-active' : 'nav-icon-cointainer'} onClick={() => switchNavBar('connect')}>
            <div className="nav-icon-base-layer">
              <i className="nav-icon nav-regular fas fa-exchange-alt" alt="connect" />
            </div>
          </div>
          <div className={curNavIndex === 'about' ? 'nav-icon-cointainer-active' : 'nav-icon-cointainer'} onClick={() => switchNavBar('about')}>
            <div className="nav-icon-base-layer">
              <i className="nav-icon nav-regular fas fa-info-circle" alt="about" />
            </div>
          </div>
        </div>
        <div className="nav-icon-cointainer" style={{ display: logInState ? 'block' : 'none' }} onClick={() => switchNavBar('exit')}>
          <div className="nav-icon-base-layer">
            <i className="nav-icon nav-regular fas fa-sign-out-alt" alt="exit" />
          </div>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  switchNavBar: PropTypes.func.isRequired,
  logInState: PropTypes.bool.isRequired,
  curNavIndex: PropTypes.string.isRequired
};
