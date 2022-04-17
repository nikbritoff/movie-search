import styled from "styled-components";
import React from "react";

const Container = styled('div')`
width: 60%;
margin-top: 20px;
margin-left: auto;
margin-right: auto;
`;

const Filter = styled('div')`
display: flex;
align-items: center;
`;

const FilterP = styled('p')`
  margin-right: 2em;
`;

const SearchBar = styled('div')`
  display: flex;
  align-items: center;
`;

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
  }

  handleEnterKeyDown(evt) {
    if (evt.key === 'Enter') {
      this.props.setLoading();
      this.props.fetchMovies(this.props.value);
    }
  }

  render() {
    return (
      <Container>
        <SearchBar>
          <input
          type='text'
          placeholder='Введите название фильма'
          value={this.props.value}
          onChange={(evt) => {
            this.props.setValue(evt.target.value);
          }}
          onKeyDown={this.handleEnterKeyDown}
          >        
          </input>
          <button
            className="btn btn__search"
            onClick={() => {
              this.props.setLoading();
              this.props.fetchMovies(this.props.value);
            }}
          >
            Поиск
          </button>
        </SearchBar>
        <Filter>
        {Object.keys(this.props.types).map((key) => (
          <FilterP key={key}>
          <label>
            <input
              className="with-gap"
              name="type"
              value={key}
              type="radio"
              checked={this.props.currentFilter === this.props.types[key]}
              onChange={(evt) => {
                this.props.setCurrentFilter(evt.target.value);
              }}
            />
            <span>{this.props.types[key]}</span>
          </label>
        </FilterP>
        ))}
        </Filter>
      </Container>
    );
  }

}

export default Search;
