import React, { Component } from 'react';

import { getSearchMaker, getSearchMakerCount } from '../../API/api';
import { getSearchRequest, getSearchRequestCount } from '../../API/api';

import '../../layouts/containers/ConnectPage.scss';

import Map from '../components/Map';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

export default class ConnectPage extends Component {
  constructor() {
    super();

    // keep both searching results and searching conditions in state
    this.state = {
      type: '',
      records: [],
      searchCondition: {
        page: 1
      },
      statistics: {
        count: 0,
        total_pages: 0
      }
    };

    // bind the function to this container
    this.submitSearchForm = this.submitSearchForm.bind(this);
    this.fetch_counts = this.fetch_counts.bind(this);
    this.fetch_maker_data = this.fetch_maker_data.bind(this);
    this.fetch_request_data = this.fetch_request_data.bind(this);
  }

  // interface to communicate with the server
  submitSearchForm(searchCondition) {
    const state = Object.assign({}, this.state);
    state.type = searchCondition.choice;
    state.searchCondition = searchCondition;

    this.fetch_counts(state);
  }

  // fetch the number of matched recordss
  fetch_counts(state) {
    const query_type = state.type;
    const prev_stat = this.state.searchCondition;

    // determine should ask for total page numbers or number of matched records
    if (query_type == 'Request') {
      if (should_pull_statistics(prev_stat, state.searchCondition)) {
        getSearchRequestCount(state.searchCondition, (jsonResult) => {
          const count = jsonResult[0].record_count;
          state.statistics = {
            count,
            total_pages: Math.ceil(count / 10)
          };

          this.fetch_request_data(state);
        });
      } else {
        this.fetch_request_data(state);
      }
    } else if (query_type == 'Maker') {
      if (should_pull_statistics(prev_stat, state.searchCondition)) {
        getSearchMakerCount(state.searchCondition, (jsonResult) => {
          const count = jsonResult[0].record_count;
          state.statistics = {
            count,
            total_pages: Math.ceil(count / 10)
          };
          this.fetch_maker_data(state);
        });
      } else {
        this.fetch_maker_data(state);
      }
    } else {
      alert('Invalid type');
    }
  }

  // fetch makers data
  fetch_maker_data(state) {
    getSearchMaker(state.searchCondition, (jsonResult) => {
      state.records = parseMaker(jsonResult);
      this.setState(state);
    });
  }

  // fetch request data
  fetch_request_data(state) {
    getSearchRequest(state.searchCondition, (jsonResult) => {
      state.records = jsonResult;
      this.setState(state);
    });
  }

  // content format
  render() {
    const { records, type } = this.state;
    return (
      <div className="flex-row">
        <div className="connect-half-container">
          <SearchForm submit={this.submitSearchForm} />
          <SearchResults records={this.state} submit={this.submitSearchForm} />
        </div>
        <Map records={records} type={type} />
      </div>
    );
  }
}

const should_pull_statistics = (prev_stat, new_stat) => {
  // use new_stat here, because new_stat have complete structre
  for (const term in new_stat) {
    if (term == 'page') continue;
    if (prev_stat[term] !== new_stat[term]) {
      return true;
    }
  }
  return false;
};

function parseMaker(data) {
  const list = [];
  for (let i = 0; i < data.length; i++) {
    const newJSON = {};
    newJSON.first_name = data[i].first_name;
    newJSON.last_name = data[i].last_name;
    newJSON.skills = [];
    for (let property in data[i]) {
      if (data[i][property] == 1) {
        property = property.replace(/_/g, ' ');
        property = property.toUpperCase();
        newJSON.skills.push(property);
      }
    }
    list.push(newJSON);
  }
  return list;
}
