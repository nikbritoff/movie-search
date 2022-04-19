import Content from './components/content/content';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import React from 'react';
import Search from './components/search/search';
import { getFilteredMovieList, onlyOnce } from './utils';

const API_KEY = process.env.REACT_APP_API_KEY;
const START_MOVIE = 'iron';
const TYPES = {
  All: 'Все',
  Movies: 'Фильмы',
  Serials: 'Сериалы',
}

const getTypeParam = (param) => {
  let typeParam = '';
    switch(param) {
      case TYPES.Movies:
        typeParam = '&type=movie';
        break;

      case TYPES.Serials:
        typeParam = '&type=series';
        break;

      default:
        typeParam = '';
    }

    return typeParam;
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
        moviesList: [],
        isLoaded: false,
        searchValue: START_MOVIE,
        currentFilter: TYPES.All,
        apiError: false,
        catalogPage: 1,
        needLoad: false,
    }

    this.setSearchValue = this.setSearchValue.bind(this);
    this.setCurrentFilter = this.setCurrentFilter.bind(this);
    this.setLoading = this.setLoading.bind(this);
    this.setApiError = this.setApiError.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.handleDocumentScroll = this.handleDocumentScroll.bind(this);
  }

  setSearchValue(value) {
    this.setState({
      searchValue: value,
    });
  }

  setCurrentFilter(type) {
    this.setState({
      currentFilter: TYPES[type],
    });
  }

  setLoading() {
    this.setState({
      isLoaded: false,
    });
  }

  setApiError(status) {
    this.setState({
      apiError: status,
    });
  }

  fetchMovies(name) {
    let typeParam = getTypeParam(this.state.currentFilter);

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${name}${typeParam}`)
      .then(res => res.json())
      .then(result => {
          this.setState({
            moviesList: result['Search'],
            isLoaded: true,
            apiError: false,
          });
      })
      .catch(() => {
        this.setState({
          apiError: true,
          isLoaded: true,
        });
      });
  }

  fetchMoreMovies() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.searchValue}${getTypeParam(this.state.currentFilter)}&page=${this.state.catalogPage + 1}`)
      .then(res => res.json())
      .then(result => {
          const filteredList = getFilteredMovieList([...this.state.moviesList.concat(result['Search'])])
          this.setState({
            moviesList: filteredList,
            apiError: false,
            catalogPage: this.state.catalogPage + 1,
          });
        })
        .catch(() => {
          this.setState({
            apiError: true,
        });
      });
  }

  handleDocumentScroll(evt) {
    const contentHeight = evt.target.documentElement.scrollHeight;
    const currentPosition = evt.target.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const onceFetch = onlyOnce(this.fetchMoreMovies, this, (contentHeight - (currentPosition + windowHeight) < 100));

    if (contentHeight - (currentPosition + windowHeight) < 100) {
      this.setState({
        needLoad: true,
      });

      document.removeEventListener('scroll', this.handleDocumentScroll);
      onceFetch();
    }
  }

  componentDidMount() {
    this.fetchMovies(START_MOVIE);
    document.addEventListener('scroll', this.handleDocumentScroll);
  }

  componentDidUpdate() {
    document.addEventListener('scroll', this.handleDocumentScroll);
  }
  
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleDocumentScroll);
    this.setState({
      moviesList: [],
      needLoad: false,
      catalogPage: 1,
    });
  }

  render() {
    return (
      <>
        <Header/>
        <main className='content'>        
          <Search
            value={this.state.searchValue}
            setValue={this.setSearchValue}
            fetchMovies={this.fetchMovies}
            setLoading={this.setLoading}
            types={TYPES}
            currentFilter={this.state.currentFilter}
            setCurrentFilter={this.setCurrentFilter}
          />
            {this.state.apiError && <h3>Поиск временно недоступен. Повторите попытку позже.</h3>}   
            {this.state.isLoaded
                ?  <Content
                  moviesList={this.state.moviesList}
                  searchValue={this.state.searchValue}
                  setSearchValue={this.setSearchValue}
                  fetchMovies={this.fetchMovies}
                  setLoading={this.setLoading}
                  isCatalogLoading={this.state.isCatalogLoading}
                  />
                : <h3>Загрузка...</h3>
              }
        </main>
        <Footer/>
      </>
    );
  }
}

export default App;
