import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.post(`https://paradiseflix.herokuapp.com/users/${user}` + "/favorites/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been added to your favorites movie.");
      })
  }
  render() {
    const { movie } = this.props;

    return (
      <div className="card-view">
        <Card border="info" bg="dark" text="white" className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
          <Button className="mb-2" block variant="primary">Open</Button>
          </Link>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className="mb-2" block variant="primary">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className="mb-2" block variant="primary">Genre</Button>
          </Link>
          <Link to={`/movie/${movie._id}`}>
            <Button className="mb-2" block variant="primary" onClick={() => this.handleAdd(movie)}>Add to favorite</Button>
          </Link>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};