import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DogPhoto extends Component {
  render() {
    const { source } = this.props;

    return (
      <img src={ source } alt="Dog" />
    );
  }
}

DogPhoto.propTypes = {
  source: PropTypes.string.isRequired,
};

export default DogPhoto;
