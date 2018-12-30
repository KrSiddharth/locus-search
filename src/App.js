import React, { Component } from 'react';
import './App.css';
import {getArray} from './mockData';
import SearchResults from './searchResults';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchData: getArray(),
      query: '',
      inView: -1,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onHover = this.onHover.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.inputRef.focus();
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value });
  }

  updateCardIndex(i) {
    this.setState({ inView: i }, () => this[`search${i}`].scrollIntoView({block: 'end', behavior: 'smooth'}));
  }

  onHover(i, e){
    if (this.state.inView !== i && (Math.abs(e.movementY) >= 2 || Math.abs(e.movementX) >= 2)) {
      this.updateCardIndex(i)
    }
  }

  handleKeyPress(event){
    let newI = this.state.inView;
    if(event.key === 'ArrowDown'){
      event.preventDefault();
      newI += 1;
    } else if (event.key === 'ArrowUp'){
      event.preventDefault();
      newI -= 1;
    }
    if (this[`search${newI}`]){
      this.updateCardIndex(newI)
    }
  }

  setRef(i, ref) {
      this[`search${i}`] = ref;
  }

  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={this.handleKeyPress}>
        <input onChange={this.handleInputChange} value={this.state.query} ref={(c) => {this.inputRef = c;}} placeholder='Search users by ID, address, name'/>
        <div className="searchResults">
        {
          <SearchResults
            searchData={this.state.searchData}
            query={this.state.query}
            inView={this.state.inView}
            onHover={this.onHover}
            setRef={this.setRef}
          />
        }
        </div>
      </div>
    );
  }
}

export default App;
