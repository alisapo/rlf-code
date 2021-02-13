import React, { Component } from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  //control input in search component
  handleSearch(e) {
    this.setState({ value: e.target.value.toLowerCase() });
  }

  //pass data to App
  sendQuery(e) {
    e.preventDefault();
    this.props.handleFilters({
      name: 'search', value: this.state.value.toLowerCase()
    });
  }

  render() {
    return (
      <div className="search-form">
        <form>
          <input
            type="search"
            name="search"
            value={this.state.value}
            onInput={(e) => this.handleSearch(e)}
            placeholder="Search..."
          />
          <button
            type="submit"
            onClick={(e) => this.sendQuery(e)}
          ></button>
        </form>
      </div>
    )
  }
}

export default Search;
