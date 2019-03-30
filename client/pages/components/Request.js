import React, { Component } from 'react';

// react component for request
export default class Request extends Component {
  render() {
    const user = `${this.props.record.first_name} ${this.props.record.last_name}`;
    const location = `${this.props.record.city} ${this.props.record.state} ${this.props.record.country}`;
    const projectName = `${this.props.record.title} (${location})`;

    // request content format
    return (
      <div className="connect-item container container--padded connect-item--request connect-item--tertiary">
        <div className="connect-content">
          <label className="mb-0 label--small">
            <i className="icon-marker-request connect-icon" aria-hidden="true" />
            Request
          </label>
          <h3 className="mt-05 mb-05">{projectName}</h3>
          <div className="label label--small connect-label">{user}</div>
        </div>
        <div className="connect-button">Contact</div>
      </div>
    );
  }
}
