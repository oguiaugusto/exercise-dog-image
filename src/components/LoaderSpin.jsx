import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

class LoaderSpin extends Component {
  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#969696"
        height={ 50 }
        width={ 50 }
        timeout={ 3000 }
      />
    );
  }
}

export default LoaderSpin;
