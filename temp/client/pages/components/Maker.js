import React, { Component } from 'react';

// react component for a maker
export default class Maker extends Component {
  render() {
    const { first_name, last_name, skills } = this.props.record;
    // maker content format
    return (
      <div className="connect-item container container--padded connect-item--maker connect-item--primary">
        <div className="connect-content">
          <label className="mb-0 label--small">
            <i className="icon-marker-maker connect-icon" aria-hidden="true" />
            Maker
          </label>
          <h3 className="mt-05 mb-05">{`${first_name} ${last_name}`}</h3>
          <div className="label label--small connect-label">{skills.join(', ')}</div>
        </div>
        <div className="connect-button">Connect</div>
      </div>
    );
  }
}
