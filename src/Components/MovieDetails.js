import React, { Component } from 'react';
import axios from 'axios';


class MovieDetails extends Component {
    state = {
        title : '',
        posterUrl : '',
        overview : '',
        releaseDate : '',
        tagLine : '',
        homepage : '',
        clicked : false
    }

    componentDidMount () {
        this.MovieDetails();
    };

    MovieDetails () {
        axios.get('https://api.themoviedb.org/3/movie/' + this.props.movieId +'?api_key=3583464c166eb3446babdeabbc188153&language=en-US')
        .then ((Details) => {
            console.log(Details);
            this.setState({
                title : Details.data.title,
                posterUrl : Details.data.poster_path, 
                overview : Details.data.overview,
                releaseDate : Details.data.release_date,
                tagLine : Details.data.tagline,
                homepage : Details.data.homepage,
                clicked : false
            });
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.movieId !== prevProps.movieId) {
            this.MovieDetails()
        }
    };

    handleClick = () => {
        if (this.state.homepage) {
            window.open(this.state.homepage)
        }
    }

    render () {

        console.log(this.state.clicked, this.state.homepage)
        let movieDetails = (<div className="card-1" onClick = {this.handleClick}>
            <img src = {'https://image.tmdb.org/t/p/w220_and_h330_face/' + this.state.posterUrl} alt = ""/>
            <h1>{this.state.title}</h1>
            <p>{this.state.overview}</p>
            <p>Released on : {this.state.releaseDate}</p>
            {this.state.tagLine.length === 0 ? null : <p>TagLine : {this.state.tagLine}</p>}
        </div>)
        return (
            <div className ="rightcolumn">
                {this.props.movieId ? movieDetails : null}
            </div>
        );
    };
};

export default MovieDetails;