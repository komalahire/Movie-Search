import React, { Component } from 'react';
import './Search.css';
import SearchList from '../SearchList/SearchList';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputBox: '',
            moviesList : []

        }
    }

    searchHandler = (event) => {
        this.setState({ inputBox: event.target.value })
        console.log(this.state.inputBox)
    }

  
    clickHandler = (event) => {
        event.preventDefault();
       
    }


    render() {
        console.log(this.state.moviesList, "movieslist")
 
        return (
            <div >
                <div className="Header">
                <form>
                    <input
                        type="search"
                        placeholder="Search movie"
                        value={this.state.inputBox}
                        onChange={this.searchHandler}
                    />
                    <button onClick={this.clickHandler}>Search</button>
                    {true ? <SearchList inputBox={this.state.inputBox}/> :null}
                </form>
            </div>
            </div>
        )
    }
};

export default Search;
