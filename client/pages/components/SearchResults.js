import React, { Component } from 'react';

import Maker from './Maker';
import Request from './Request';

import '../../layouts/components/SearchResult.scss';

// css effect for DOM element with id init_search_view
// determine display or not by the given type
const init_search_view = type => ({
  display: type === '' ? 'block' : 'none'
});

// css effect for DOM element with id records_list
// determine display or not by the returning records length
const records_list = records => ({
  boxSizing: 'border-box',
  display: records.length > 0 ? 'block' : 'none'
});

// css effect for DOM element with id no_records
// determine display or not by the returning records length
const no_records = (records, type) => ({
  display: records.length > 0 || type === '' ? 'none' : 'block'
});

// react componet for Search results
export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    // bind the function to this component
    this.flipPage = this.flipPage.bind(this);
  }

  // onclick effect of going to specific page number of the serching query
  flipPage(page_num) {
    // set new page number
    const { searchCondition } = this.props.records;
    searchCondition.page = page_num;

    // call parent to fetch the next page without change the base searching settings
    const { submit } = this.props;
    submit(searchCondition);
  }

  // content format for search result
  render() {
    const { type, records } = this.props.records;

    // current page number
    const current_page = this.props.records.searchCondition.page;

    // determing which page numbers button should be shown
    const { total_pages } = this.props.records.statistics;
    const init_page = Math.max(0, current_page - 4);
    const last_page = Math.min(init_page + 5, total_pages);
    const display_pages = Array(last_page - init_page).fill(init_page).map((val, index) => val + index + 1);

    // format of the searching result
    return (
      <div className="result-list">
        {/* Show following part only if user just get in the site */}
        <div className="container container--padded connect-container" id="init_search_view" style={init_search_view(type)}>
          <div className="inner">
            <h1 className="mt-0" id="connect-heading">Search by city</h1>
            <div id="connect-info">Look for a Maker or search for project requests in your community to build</div>
          </div>
        </div>

        {/* Showing fetching results only if the records is not empty */}
        <div id="records_list" style={records_list(records)}>
          {records.map((record, index) => {
            if (type === 'Maker') {
              return (<Maker key={`m${index}`} record={record} />);
            }
            return (<Request key={`m${index}`} record={record} />);
          })}

          {/* show options for different pages */}
          <div className="container">
            <div className="pagination">
              <ul className="pagination-links">
                {display_pages.map((page_num, index) => {
                  if (page_num == current_page) {
                    return (<CurrentPage key={`PageIndex${index}`} page_num={page_num} />);
                  }
                  return (<OtherPage key={`PageIndex${index}`} page_num={page_num} flipPage={this.flipPage} />);
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Show following part only if no fetched records after search */}
        <div className="container container--padded connect-container" id="no_records" style={no_records(records, type)}>
          <div className="inner">
            <h1 className="mt-0" id="connect-heading">No Records found!</h1>
            <div id="connect-info">Makers Making Change (MMC) is a community led project that can only happen because people like you volunteer their time and skills to make change! To learn more about how to bring MMC to your community and how to get involved, check out our resource section or email info@makersmakingchange.com to learn more!</div>
          </div>
        </div>

      </div>
    );
  }
}

class CurrentPage extends React.Component {
  render() {
    return (
      <li className="page-number page-numbers current pagination-number">
        <span className="pagination-link">
          <span className="sr-only">Page </span>
          {this.props.page_num}
        </span>
      </li>
    );
  }
}

class OtherPage extends React.Component {
  render() {
    return (
      <li className="page-number page-numbers pagination-number">
        <a className="pagination-link" onClick={() => this.props.flipPage(this.props.page_num)}>
          <span className="sr-only">Page </span>
          {this.props.page_num}
        </a>
      </li>
    );
  }
}
