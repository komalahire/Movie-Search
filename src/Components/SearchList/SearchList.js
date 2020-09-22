import React, { Component } from "react";
import axios from "axios";
import './SearchList.css';
import MovieDetails from "../MovieDetails/MovieDetails";

export class SearchList extends Component {
    state = {
        movies : [],
       clicked : false,
        movieId : ''
    };
  componentDidMount() {
    this.MovieList();
    this.setState({ movies: [] });
  }

  componentDidUpdate(prevProps) {
    if (this.props.inputBox !== prevProps.inputBox) {
      this.MovieList();
    }
  }

  MovieList = () => {
    var movieArray = [];
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=3583464c166eb3446babdeabbc188153&language=en-US&query=" +
          this.props.inputBox +
          "&page=1&include_adult=false"
      )
      .then((response) => {
        console.log(response, "komall");
        response.data.results.map((movie) => {
          let oneMovie = [];
          oneMovie.push(movie.id, movie.title, movie.overview);
          movieArray.push(oneMovie);
          return movieArray;
        });
        return this.setState({ movies: movieArray });
      })
      .catch((error) => {
        this.setState({ error: "Invalid search" });
      });
  };

  clickHandler = (id) => {
    this.setState({movieId : id})
    this.setState({clicked : true})
};
  render() {
    let movieDetails = <MovieDetails movieId = {this.state.movieId}/>
    return (
      <div className="container">
        <div className="leftcolumn">
          {this.state.movies.map((movie) => {
            return (
              <div
                className="card"
                key={movie[0]}
                onClick={() => this.clickHandler(movie[0])}
              >
                <h2>{movie[1]}</h2>
                <p>{movie[2]}</p>
              </div>
            );
            
          })}
           {this.state.clicked ? movieDetails : null}
           
        </div>
      </div>
    );
  }
}

export default SearchList;
