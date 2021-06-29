import React from 'react';
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { Link } from "react-router-dom";
import "./movie-view.scss"


export class MovieView extends React.Component {
  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://paradiseflix.herokuapp.com//users/${user}` + "/movies/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been added to your favorites!");
      })
  }

  handleRemove() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://paradiseflix.herokuapp.com//users/${user}` + "/movies/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been removed from your favorites!");
      })
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div>
      <div className="movie-view">
          <div className="movie-poster cent">
            <img src={movie.ImagePath} />
          </div>
          <div className="movie-title cent my-4">
            <span className="label font-weight-bold">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="my-3">
            <span className="label font-weight-bold">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="my-3">
            <span className="label font-weight-bold">Released: </span>
            <span className="value">{movie.Year}</span>
          </div>
          <div className= "container my-4">
          <div className="text-center">
          <Button variant="secondary" size="sm" onClick={()=>onBackClick()}>Back</Button>

          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        </div>
        <div class= "container">
          <div class="col text-center">
          <Link to={`/movies/${movie._id}`}>
            <Button d-grid gap-2 col-6 mx-auto variant="primary mr-3" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
          </Link>
          <Link to={`/movies/${movie._id}`}>
            <Button d-grid gap-2 col-6 mx-auto variant="danger mr-3" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
          </Link>
          </div>
        </div>
        </div>
        </div>
    );
  }
};


