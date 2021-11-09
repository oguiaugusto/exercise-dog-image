import React, { Component } from 'react';
import LoaderSpin from './LoaderSpin';
import DogPhoto from './DogPhoto';

class DogContainer extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      dogObj: undefined,
      dogName: '',
    };

    this.requestPhoto = this.requestPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.loadSavedDog = this.loadSavedDog.bind(this);
  }

  componentDidMount() {
    const dogInfo = localStorage.getItem('dogInfo');

    if (dogInfo) {
      const { photo } = JSON.parse(dogInfo);
      this.loadSavedDog(photo);
    } else {
      this.requestPhoto();
    }
  }

  shouldComponentUpdate() {
    const { dogObj: { message = '' } = {} } = this.state;

    return !message.includes('terrier');
  }

  componentDidUpdate(_prevProps, prevState) {
    const { dogObj: { message = '' } = {}, dogArray } = this.state;
    const { dogObj: { message: prevMsg = '' } = {} } = prevState;

    const dogType = message.split('/')[4];
    const prevDogType = prevMsg.split('/')[4];

    // eslint-disable-next-line no-alert
    if (dogType && dogType !== prevDogType) alert(`Raça: ${dogType}`);

    if (dogArray !== undefined) {
      localStorage.setItem('dogInfo', JSON.stringify(dogArray));
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
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

  saveDog() {
    const { dogName, dogObj: { message } } = this.state;
    const dogInfo = { name: dogName, photo: message };

    this.setState({ dogArray: dogInfo, dogName: '' });
  }

  loadSavedDog(imageUrl) {
    this.setState({
      dogObj: { message: imageUrl },
      loading: false,
    });
  }

  render() {
    const { requestPhoto, handleChange, saveDog } = this;
    const { loading, dogObj: { message } = '', dogName } = this.state;

    if (loading) return <div className="loading"><LoaderSpin /></div>;

    return (
      <>
        <div className="container">
          <button type="button" onClick={ requestPhoto }>Au!</button>
          <div className="input-container">
            <input
              type="text"
              name="dogName"
              placeholder="Dê um nome para este doguinho"
              value={ dogName }
              onChange={ handleChange }
            />
            <button type="button" onClick={ saveDog }>Guardar</button>
          </div>
        </div>
        <div className="dog-photo">
          <DogPhoto source={ message } />
        </div>
      </>
    );
  }
}

export default DogContainer;
