import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (

      <div className="genre-view">
        <div className="my-2">
          <span className="label font-weight-bold">Genre: </span>
          <span className="value">{genreData.Name}</span>
        </div>
        <div className="my-2">
          <span className="label font-weight-bold">Description: </span>
          <span className="value">{genre.Description}</span>
        </div>
          <Button variant="info" className="my-3" onClick={()=>onBackClick()}>Back</Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
  }).isRequired
};