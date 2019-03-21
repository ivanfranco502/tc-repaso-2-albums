/*

Completar el componente para que:

- Cuando se haga click en el Title actualice estado de abierto
- Cuando esté abierto que muestre una lista de <Photo /> para el AlbumId
- Las fotos son obtenidas utilizando fetchPhotos(albumId)
- Las fotos deben ser cacheadas: en caso de que el estado isOpen se modifique no hará un nuevo fetchPhotos sino que usará el anterior

*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchPhotos } from '../services/albums';

import Photo from '../components/Photo';

class Album extends Component {
  state = {
    isOpen: false,
    photos: [],
    loading: false,
    loaded: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && !this.state.loaded && !this.state.loading) {
      fetchPhotos(this.props.id).then(photos => {

        this.setState({
          photos,
          loading: false,
          loaded: true
        });

      });
    }
  }

  onTitleClick = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  }

  render() {
    const {
      isOpen,
      loading,
      photos
    } = this.state;

    const { title } = this.props;

    return (
      <li>
        <a onClick={this.onTitleClick}>{title}</a>
        {isOpen && 
          <ul>
            { loading 
                ? "Cargando...." 
                : this.state.photos.map(photo => (
                  <Photo key={photo.id} {...photo} />
                ))
            }
          </ul>
        }
      </li>
    );
  }

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string
  };
};

export default Album;