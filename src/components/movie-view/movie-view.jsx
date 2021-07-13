import React from 'react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Card border="info" bg="dark" text="white" className="movie-card">
          <Card.Img variant='top' src={movie.ImagePath} />

          <Card.Body>
            <Card.Title><span className='text-primary'>Title: </span> {movie.Title}</Card.Title>
            <Card.Text><span className='text-primary'>Description: </span>{movie.Description}</Card.Text>
            <Card.Text><span className='text-primary'>Genre: </span>{movie.Genre.Name}</Card.Text>
            <Card.Text><span className='text-primary'>Director: </span>{movie.Director.Name}</Card.Text>
            <Button block onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  //onBackClick: PropTypes.func.isRequired,
  })
};