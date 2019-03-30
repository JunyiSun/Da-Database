import React, { Component } from 'react';

import '../../layouts/components/SearchForm.scss';

// the React component for the searching form
export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  // on submit it returns a searching condition to parent container
  submitHandler(e) {
    e.preventDefault();

    // extract values from components
    let location = document.getElementById('connect_location').value;
    let sorted_by = document.getElementById('sorting_order').innerText;
    const choice = document.getElementById('toggle_value').innerText;
    const defaut_page_num = 1;

    // returning location are a comma separate string,we can determine the
    // type of the returning location string base on number of commas
    location = location.split(',');
    const location_type = this.determine_location_type(location);

    // use the first value as key for searching
    location = location[0];

    // convert sorted_by to SQL sorted by string format
    sorted_by = (sorted_by == 'Ascending') ? 'ASC' : 'DESC';

    // details of returning form
    const form_params = {
      location_type,
      location,
      choice,
      sorted_by,
      page: defaut_page_num
    };

    // let the partent container handle the form submition
    const { submit } = this.props;
    submit(form_params);
  }

  // determine the location types
  determine_location_type(location) {
    const location_len = location.length;
    if (location_len == 1) {
      return 'country';
    } if (location_len == 2) {
      return 'state';
    } if (location_len == 3) {
      return 'city';
    }
  }

  componentDidMount() {
    const script = document.createElement('script');

    if (window._babelPolyfill) {
      window._babelPolyfill = false;
    }

    const clearRegionBox = document.querySelectorAll('[role=log]');
    for (let i = clearRegionBox.length - 1; i >= 0; i--) {
      clearRegionBox[i].remove();
    }

    const thirdPartyScript = document.getElementById('third-party-script');
    if (thirdPartyScript) {
      thirdPartyScript.remove();
    }

    script.src = 'https://www.makersmakingchange.com/wp-content/themes/mmc/dist/scripts/public.js';
    script.async = true;
    script.id = 'third-party-script';

    document.body.appendChild(script);
  }

  // content for the form
  render() {
    return (
      <form className="search-form flex-row" onSubmit={this.submitHandler}>
        {/* input for location */}
        <div className="search-input-bar">
          <label htmlFor="connect_location" placeholder="Enter Your Location" alt="Enter Your Location">
            <span>Enter Your Location</span>
          </label>
          <input type="text" name="location" id="connect_location" value="" required />
        </div>

        {/* select one of the searching target maker or request, the default value is Maker */}
        <div className="form-filter-content dqpl-field-wrap" data-focus-parent="field" style={{ width: '20%' }}>
          <div className="form-filter-select dqpl-select js-select-wrapper">
            <div className="dqpl-combobox" role="combobox" tabIndex="0" aria-autocomplete="none" aria-owns="list_map" aria-expanded="false" aria-labelledby="label_map" aria-required="true">
              <div className="dqpl-pseudo-value js-select-value" id="toggle_value">Maker</div>
              <input type="hidden" name="type" />
            </div>
            <ul id="list_map" aria-labelledby="label_map" className="dqpl-listbox" role="listbox">
              <li id="maker" className="dqpl-option" role="option">Maker</li>
              <li id="request" className="dqpl-option" role="option">Request</li>
            </ul>
          </div>
        </div>

        {/* select one of the sorting order, the default value is Ascending */}
        <div className="form-filter-content dqpl-field-wrap" data-focus-parent="field" style={{ width: '20%' }}>
          <div className="form-filter-select dqpl-select js-select-wrapper">
            <div className="dqpl-combobox" role="combobox" tabIndex="0" aria-autocomplete="none" aria-owns="sorting_map" aria-expanded="false" aria-labelledby="label_map" aria-required="true">
              <div className="dqpl-pseudo-value js-select-value" id="sorting_order">ASC</div>
              <input type="hidden" name="type" />
            </div>
            <ul id="sorting_map" aria-labelledby="label_map" className="dqpl-listbox" role="listbox">
              <li id="accending" className="dqpl-option" role="option">ASC</li>
              <li id="deccending" className="dqpl-option" role="option">DESC</li>
            </ul>
          </div>
        </div>

        {/* submit button */}
        <div className="form-filter-submit" data-focus-parent="btn" style={{ width: '20%' }}>
          <input type="submit" className="form-filter-submit" value="Search" />
        </div>
      </form>
    );
  }
}
