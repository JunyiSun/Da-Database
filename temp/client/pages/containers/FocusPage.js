import React, { Component } from 'react';

// Style sheets
import '../../layouts/containers/FocusPage.scss';
import '../../layouts/layoutClass.scss';

export default class FocusPage extends Component {
  constructor() {
    super();

    this.state = {
      tabBar: {
        titles: ["Makers", "Requests", "Events", "Projects"],
        states: [true, false, false, false]
      }
    }

    this.switchTabs = this.switchTabs.bind(this);
    this.showFocusResult = this.showFocusResult.bind(this);
  }

  switchTabs(index){
    let state = this.state;
    let tabStates = [false, false, false, false];
    tabStates[index] = true;
    state.tabBar.states = tabStates;
    this.setState(state);
  }

  showFocusResult(){
    const { states } = this.state.tabBar;
    if(states[0]){
      return(<div>Makers</div>)
    }else if(states[1]){
      return(<div>Requests</div>)
    }else if(states[2]){
      return(<div>Events</div>)
    }else{
      return(<div>Projects</div>)
    }
  }

  render(){
    return(
      <div className="focus-list-content flex-col">
        <div className="focus-list-head flex-row-center-between">
          <div className="focus-list-tabs flex-row-center-between">
            {this.state.tabBar.titles.map((title, index) => {
              let isCurrentTab = this.state.tabBar.states[index];
              return(
                <div className="focus-list-tab flex-col" key={"title"+index} onClick={() => this.switchTabs(index)}>
                  <span className={isCurrentTab? "focus-title-active":"focus-title-inactive"}>{title}</span>
                </div>
              );
            })}
          </div>
          <div className="back-button" onClick={() => this.props.switchPage("DashBoard")}>
            Back
            <i className="fas fa-backspace"/>
          </div>
        </div>
        
        <div className="underline-wrapper flex-row">
          {this.state.tabBar.states.map((state, index) => {
            return(
              <div className={state? "tab-underline-active":"tab-underline-inactive"} key={"state"+index}/>
            );
          })}
        </div>

        <div className="focus-list-results">
          {this.showFocusResult()}
        </div>
      </div>
    )
  }
}