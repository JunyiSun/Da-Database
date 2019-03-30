import React, { Component } from 'react';

// Style sheets
import '../../layouts/containers/UserDashBoard.scss';
import '../../layouts/layoutClass.scss';

export default class UserDashBoard extends Component {
  constructor(props) {
    super(props);

    const countTrues = l => {
      return l.reduce((sum,val) => {
        return sum + (val? 1:0);
      }, 0)
    }

    const {user, counts} = props;
    const userCounts = [counts.makers, counts.requesters, counts.events, counts.projects];
    const skillsCount = [user.pv, countTrues(user.skills), countTrues(user.industries), countTrues(user.interests)];

    this.state = {
      userTitles: ["Makers", "Requests", "Events", "Projects"],
      userCounts: userCounts,
      skillsTitle: ["Visited", "Industries", "Skills", "Interests"],
      skillsCount: skillsCount
    }
  }

  render() {
    const { user  } = this.props;
    const {userTitles, skillsTitle, userCounts, skillsCount} = this.state;

    return (
      <div className="dashboard-content flex-col-center-between">
        <div className="user-focus flex-row-center-between">
          {userTitles.map((title,index) => {
            return(
              <div className="user-focus-block flex-col" key={"focusBlock"+index} onClick={() => this.props.switchPage("Focus")}>
                <div className="user-focus-title">{title}</div>
                <div className="user-focus-count">{userCounts[index]}</div>
              </div>
            )
          })}
        </div>

        <div className="user-cards flex-row-center-between">
          <div className="user-card-img flex-row-center-center">
            {user.image===""? <i className="far fa-user"/>:<img src={user.image}/>}
          </div>
          <div className="user-card-info flex-col">
            <div className="flex-col">
              <span>Welcome back</span>
              <span>{user.name}</span>
            </div>
            <div className="go-profile-container flex-row">
              <div className="go-profile-button" onClick={() => this.props.switchPage("Edit")}>
                Go Profile
              </div>
            </div>
          </div>
        </div>

        <div className="user-skills flex-row-center-between">
          {skillsTitle.map((skillTitle,index) => {
            return(
              <div className="user-skills-block flex-col"  key={"skillBlock"+index}>
                <div className="user-skills-title">{skillTitle}</div>
                <div className="user-skills-count">{skillsCount[index]}</div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}