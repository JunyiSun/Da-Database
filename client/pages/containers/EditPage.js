import React, { Component } from 'react';

// Style sheets
import '../../layouts/containers/EditPage.scss';
import '../../layouts/layoutClass.scss';

// constants
const rolesTitles=  [ "Other", "Maker", "Requester"];
const skillsTitles = ["3D printing", "Aided design", "Design", "Electronics", 
  "Engineering", "welding", "Laser cutting", "mechanics", "other", "software", 
  "soldering", "woodworking"];
const industriesTitles = ["corporation", "educational",	"makerspace"];
const interestsTitles = ["Help my disability","Help disabilities","Not decided yet","make things",
  "organizing events","reviewing projects","sharing ideas","supporting people",
      "teaming up"];

export default class EditPage extends Component {
  constructor(props) {
    super(props);

    let {user} = props;
    let rolesState = ((roleNum) => {
      switch (roleNum){
        case 0: return [true,false,false]
        case 1: return [false,true,false]
        case 2: return [false,false,true]
        default: return [false,false,false]
      }
    })(user.role);

    let skillsState = user.skills.length==0? [false,false,false,false,false,false,false,false,false,false,false,false]:user.skills;
    let industriesState = user.industries.length==0? [false, false, false]:user.industries;
    let interestsState = user.interests.length==0? [false,false,false,false,false,false,false,false,false]:user.interests;

    this.state = {
      buffer:{
        image: ""
      },
      user: user,
      rolesState: rolesState,
      skillsState: skillsState,
      industriesState: industriesState,
      interestsState: interestsState
    }

    this.userNameOnChange = this.userNameOnChange.bind(this);
    this.imgURLonChange = this.imgURLonChange.bind(this);
    this.descriptionOnChange = this.descriptionOnChange.bind(this);

    this.updateRolesState = this.updateRolesState.bind(this);
    this.updateSkillsState = this.updateSkillsState.bind(this);
    this.updateIndustriesState = this.updateIndustriesState.bind(this);
    this.updateInterestsState = this.updateInterestsState.bind(this);

    this.updateImage = this.updateImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.saveChanges = this.saveChanges.bind(this);
  }

  updateRolesState(index){
    let state = this.state;
    let rolesState = [false, false, false]
    
    rolesState[index] = true;
    state.rolesState = rolesState;
    this.setState(state);
  }

  updateSkillsState(index){
    let state = this.state;
    state.skillsState[index] = !state.skillsState[index];
    this.setState(state);
  }

  updateIndustriesState(index){
    let state = this.state;
    state.industriesState[index] = !state.industriesState[index];
    this.setState(state);
  }

  updateInterestsState(index){
    let state = this.state;
    state.interestsState[index] = !state.interestsState[index];
    this.setState(state);
  }

  userNameOnChange(e){
    e.preventDefault();
    let state = this.state;
    state.user.name = e.target.value;
    this.setState(state);
  }

  imgURLonChange(e){
    e.preventDefault();
    let state = this.state;
    state.buffer.image = e.target.value;
    this.setState(state);
  }

  descriptionOnChange(e){
    e.preventDefault();
    let state = this.state;
    state.user.description = e.target.value;
    this.setState(state);
  }

  updateImage(e){
    e.preventDefault();

    let state = this.state;
    state.user.image = state.buffer.image;
    // todo
    this.setState(state);
  }

  deleteImage(e){
    e.preventDefault();

    let state = this.state;
    state.user.image = "";
    state.buffer.image = "";
    // todo
    this.setState(state);
  }

  saveChanges(e){
    e.preventDefault();

    const state = this.state;
    
    let user = Object.assign({}, state.user);
    user.role = state.rolesState.indexOf(true);
    user.skills = state.skillsState;
    user.industries = state.industriesState;
    user.interests = state.interestsState;

    this.props.updateUser(user);
    this.props.switchPage("DashBoard");
  }

  render(){
    const state = this.state;

    return(
      <div className="edit-content-wrapper flex-col">
        <div className="edit-head flex-row-center-between">
          <div className="edit-tabs flex-row-center-between">
            <div>Settings</div>
          </div>
          <div className="back-button" onClick={() => this.props.switchPage("DashBoard")}>
            Back
            <i className="fas fa-backspace"/>
          </div>
        </div>
        
        <div className="setting-content">
          <div className="edit-section flex-col">
            <div className="edit-section-title">User information</div>
            <div className="edit-section-content">
              <div className="edit-input-row flex-row">
                <div className="edit-field flex-row-center">Name:</div>
                <input type="text" className="edit-field-content edit-input flex-row-center" placeholder={state.user.name===""? state.user.email:state.user.name} onChange={this.userNameOnChange}/>
              </div>

              <div className="edit-input-row flex-row">
                <div className="edit-field flex-row-center">Email:</div>
                <div className="edit-field-content static-text flex-row-center">{state.user.email}</div>
              </div>

              <div className="edit-input-row flex-row">
                <div className="edit-field flex-row-center">Role:</div>
                <div className="select-role flex-row">
                  {rolesTitles.map((title, index) => {
                    if (state.rolesState[index]) {
                      return(<div className="select-val-fixed select-val-active flex-row-center-center" key={"role"+index} onClick={() => this.updateRolesState(index)}>{title}</div>)
                    } else {
                      return(<div className="select-val-fixed select-val-inactive flex-row-center-center" key={"role"+index} onClick={() => this.updateRolesState(index)}>{title}</div>)
                    }
                  })}
                </div>
              </div>

              <div className="edit-input-row flex-row">
                <div className="edit-field flex-row-center">Visited:</div>
                <div className="edit-field-content static-text flex-row-center">{state.user.pv}</div>
              </div>

              <div className="edit-input-row flex-row">
                <div className="edit-field flex-row-center">Password:</div>
                <div className="edit-field-content flex-row-center">
                  <div className="change-password-button flex-row-center-center" onClick={this.props.openResetPassword}>Change Password</div>
                </div>
              </div>

              <div className="edit-input-row flex-row">
                <div className="edit-field">Description:</div>
                <div className="edit-field-content">
                  <textarea className="edit-textArea" onChange={this.descriptionOnChange} value={state.user.description}/>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-section flex-col">
            <div className="edit-section-title">User Picture</div>
            <div className="edit-section-content flex-row">
              <img className="edit-img" src={state.user.image}/>
              <div className="edit-img-content-wrap flex-col-center-between">
                <input type="text" className="edit-field-content edit-input flex-row-center" placeholder="please enter the html" onChange={this.imgURLonChange}/>
                <div className="button-wrapper flex-row-center-between">
                  <div className="upload-button flex-row-center-center" onClick={this.updateImage}>Update</div>  
                  <div className="delete-button flex-row-center-center" onClick={this.deleteImage}>Delete</div>
                </div>
              </div>
            </div>
          </div>

          <div className="edit-section flex-col">
            <div className="edit-section-title">Other</div>
            
            <div className="edit-section-content flex-row">
              <div className="edit-field">Skills:</div>
              <div className="select-role flex-row">
                  {skillsTitles.map((title, index) => {
                    if (state.skillsState[index]) {
                      return(<div className="select-val select-val-active flex-row-center-center" key={"skill"+index} onClick={() => this.updateSkillsState(index)}>{title}</div>)
                    } else {
                      return(<div className="select-val select-val-inactive flex-row-center-center" key={"skill"+index} onClick={() => this.updateSkillsState(index)}>{title}</div>)
                    }
                  })}
              </div>
            </div>

            <div className="edit-section-content flex-row">
              <div className="edit-field">Industries:</div>
              <div className="select-role flex-row">
                  {industriesTitles.map((title, index) => {
                    if (state.industriesState[index]) {
                      return(<div className="select-val select-val-active flex-row-center-center" key={"industries"+index} onClick={() => this.updateIndustriesState(index)}>{title}</div>)
                    } else {
                      return(<div className="select-val select-val-inactive flex-row-center-center" key={"industries"+index} onClick={() => this.updateIndustriesState(index)}>{title}</div>)
                    }
                  })}
              </div>
            </div>

            <div className="edit-section-content flex-row">
              <div className="edit-field">Interestests:</div>
              <div className="select-role flex-row">
                  {interestsTitles.map((title, index) => {
                    if (state.interestsState[index]) {
                      return(<div className="select-val select-val-active flex-row-center-center" key={"interest"+index} onClick={() => this.updateInterestsState(index)}>{title}</div>)
                    } else {
                      return(<div className="select-val select-val-inactive flex-row-center-center" key={"interest"+index} onClick={() => this.updateInterestsState(index)}>{title}</div>)
                    }
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="save-button-wrapper flex-row">
            <div className="save-button flex-row-center-center" onClick={this.saveChanges}>
              <i className="far fa-save"/>
              Save
            </div>
        </div>
      </div>
    )
  }
}