import React, { Component } from 'react';
import LoaderSpin from './LoaderSpin';
import DogPhoto from './DogPhoto';

class DogContainer extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      dogObj: undefined,
    };

    this.requestPhoto = this.requestPhoto.bind(this);
  }

  componentDidMount() {
    this.requestPhoto();
  }

  requestPhoto() {
    this.setState({ loading: true }, () => {
      const url = 'https://dog.ceo/api/breeds/image/random';

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            dogObj: data,
            loading: false,
          });
        });
    });
  }

  render() {
    const { requestPhoto } = this;
    const { loading, dogObj: { message } = '' } = this.state;

    if (loading) return <div className="loading"><LoaderSpin /></div>;

    return (
      <>
        <div className="button-container">
          <button type="button" onClick={ requestPhoto }>Au!</button>
        </div>
        <div className="dog-photo">
          <DogPhoto source={ message } />
        </div>
      </>
    );
  }
}

export default DogContainer;
