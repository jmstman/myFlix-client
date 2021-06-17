import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
//import Card from 'react-bootstrap/Card';
import "./movie-view.scss"



export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster cent">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title cent my-4">
          <span className="label font-weight-bold">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="my-3">
          <span className="label font-weight-bold">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="my-3">
          <span className="label font-weight-bold">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="my-3">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}

MovieView.propTypes={
  movie:PropTypes.shape({
      title:PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre:PropTypes.string.isRequired,
      director:PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
     }).isRequired,
     onClick:PropTypes.func.isRequired
};