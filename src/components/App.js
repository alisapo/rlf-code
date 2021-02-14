import React, { Component } from 'react';

import Search from './Search';
import Filters from './Filters';
import Card from './Card';

import { getData } from './js/getData';
import { setObj } from './js/setObj';
import { filterArticles } from './js/filterArticles';

import '../App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: '',
      search: '',
      allFilters: '',
      numberOfArticles: 3,

      viewMore: {
        cs: false,
        pi: false,
        as: false
      },

      filters: {
        section: '',
        speciality: '',
        audience: ''
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleFilters = this.handleFilters.bind(this);
    this.getArticles = this.getArticles.bind(this);
  }

  componentDidMount() {
    //get filters
    getData('./filters.json')
      .then((res) => {
        this.setState({
          allFilters: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //get articles
    this.getArticles();
  }

  //get articles for first opening and after filtrations and searching
  getArticles() {
    getData('./data.json')
      .then((res) => {
        let arr =[];

        if (
          !this.state.filters.section
          && !this.state.filters.speciality
          && !this.state.filters.audience
        )
        arr = res.data;
        
        //if 1 filter is fill, filter articles
        arr = filterArticles(res.data, this.state.filters);
        this.setState({
          articles: arr,
          viewMore: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //update articles if filters or search query are changed
  componentDidUpdate(_, prevState) {
    const {search, filters, articles } = this.state;

    if (filters.section !== prevState.filters.section) {
      this.getArticles();
    };

    if (filters.speciality !== prevState.filters.speciality) {
      this.getArticles();
    };

    if (filters.audience !== prevState.filters.audience) {
      this.getArticles();
    };
      
    if (search !== prevState.search) {
      const filtered = articles.filter(article =>
        article.title
          .toLowerCase()
          .indexOf(search) >= 0
        || article.summary
          .toLowerCase()
          .indexOf(search) >= 0
        );
      this.setState({
        articles: filtered,
        viewMore: false
      });
    };
  }

  //view more button
  handleClick(id) {
    const obj = setObj(id, '', this.state.viewMore);
    this.setState({ viewMore: obj });
  }

  //change filters and search query
  handleFilters({ name, value }) {
    if (name === 'search') this.setState({ search: value });
    
    const obj = setObj(name, value, this.state.filters);
    this.setState({ filters: obj });
  }

  render() {
    const {
      viewMore,
      numberOfArticles,
      articles
    } = this.state,

      caseStudy = Array.from(articles)
        .filter(i => i.section === 'case study'),
      numOfCS = viewMore.cs ? caseStudy.length : numberOfArticles,

      productInformation = Array.from(articles)
        .filter(i => i.section === 'product information'),
      numOfPI = viewMore.pi ? productInformation.length : numberOfArticles,

      abstractSummary = Array.from(articles)
        .filter(i => i.section === 'abstract summary'),
      numOfAS = viewMore.as ? abstractSummary.length : numberOfArticles;

    return (
      <div className="app">
        <header className="app-header">
          <div className="search">
            <p>Search the Academy by keyword:</p>
            <Search handleFilters={this.handleFilters} />
          </div>
          <div className="filters">
            <p>Filter content by:</p>
            <Filters
              handleFilters={this.handleFilters}
              filters={this.state.allFilters}
            />
          </div>
        </header>
        {!articles.length
          ? <div className="no-results">No results</div>
          : <section className="articles">
              <div
                className="articles-section"
                style={{display: !caseStudy.length ? 'none' : 'flex'}}
              >
                <div className="section-header">
                  <h1>Case study</h1>
                </div>
                <div className="cards-section">
                  {caseStudy.slice(0, numOfCS).map((article) =>
                    <Card key={article.id} article={article} />
                  )}
                </div>
                <button
                  className="view-more"
                  id="cs"
                  style={{display: caseStudy.length <= numberOfArticles ? 'none' : 'block'}}
                  onClick={(e) => this.handleClick(e.target.id)}
                >
                  View more
                </button>
              </div>
              <div
                className="articles-section"
                style={{display: !productInformation.length ? 'none' : 'flex'}}
              >
                <div className="section-header">
                  <h1>Product information</h1>
                </div>
                <div className="cards-section">
                  {productInformation.slice(0, numOfPI).map((article) =>
                    <Card key={article.id} article={article} />
                  )}
                </div>
                <button
                  className="view-more"
                  id="pi"
                  style={{display: productInformation.length <= numberOfArticles ? 'none' : 'block'}}
                  onClick={(e) => this.handleClick(e.target.id)}
                >
                  View more
                </button>
              </div>
              <div
                className="articles-section"
                style={{display: !abstractSummary.length ? 'none' : 'flex'}}
              >
                <div className="section-header">
                  <h1>Abstract summary</h1>
                </div>
                <div className="cards-section">
                  {abstractSummary.slice(0, numOfAS).map((article) =>
                    <Card key={article.id} article={article} />
                  )}
                </div>
                <button
                  className="view-more"
                  id="as"
                  style={{display: abstractSummary.length <= numberOfArticles ? 'none' : 'block'}}
                  onClick={(e) => this.handleClick(e.target.id)}
                >
                  View more
                </button>
              </div>
            </section>}
      </div>
    );
  }
}

export default App;
