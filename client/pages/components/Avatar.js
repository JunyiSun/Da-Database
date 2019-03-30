import React, { Component } from 'react';

import '../../layouts/components/Avatar.scss';
import '../../layouts/layoutClass.scss';

export default class Avatar extends Component {
  render() {
    const image = this.props.image;
    return (
      <div className="Avatar-content flex-row-center-around"> 
        <div className="Avatar-wrapper flex-row-center-around"> 
          {image? 
            <img className="Avatar-icon" src={image}/>:
            <i className="Avatar-icon fas fa-user"/>
          }
        </div>
      </div>
    );
  }
}
