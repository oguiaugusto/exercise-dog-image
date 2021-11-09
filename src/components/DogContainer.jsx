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

  shouldComponentUpdate() {
    const { dogObj: { message = '' } = {} } = this.state;

    return !message.includes('terrier');
  }

  componentDidUpdate(_prevProps, prevState) {
    const { dogObj: { message = '' } = {} } = this.state;
    const { dogObj: { message: prevMsg = '' } = {} } = prevState;

    const dogType = message.split('/')[4];
    const prevDogType = prevMsg.split('/')[4];

    // eslint-disable-next-line no-alert
    if (dogType && dogType !== prevDogType) alert(`Raça: ${dogType}`);

    sessionStorage.setItem('photoUrl', message);
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
