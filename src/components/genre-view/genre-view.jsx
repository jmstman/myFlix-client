 
import React from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props; 

    return (
      <div className="genre-view cent my-4">
      <div className="my-2">
        <span className="label font-weight-bold">Genre: </span>
        <span className="value">{genre.Name}</span>
      </div>
          <div className="genre-description">
          <div className="my-2">
        <span className="label font-weight-bold">Description: </span>
        <span className="value">{genre.Description}</span>
      </div>
      <div className="d-flex justify-content-center">
      <div className="my-2">
          <Button variant="info" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
        </div>
        </div>
        </div>
    );
  }
}

GenreView.propType = {
  movies: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default GenreView;