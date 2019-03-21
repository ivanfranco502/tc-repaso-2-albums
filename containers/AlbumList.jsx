import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchAll } from '../services/albums';

import Album from './Album';
import Filter from '../components/Filter';

class AlbumList extends Component {
  state = {
    albums: [],
    query: '',
    loading: true
  };

  componentDidMount() {
    fetchAll().then(albums => {
      this.setState({ albums, loading: false })
    });
  }

  render() {
    const { loading, albums, query } = this.state;

    if (loading) return 'Cargando ...';
    
    return (
      <div>
        <Filter
          query={query}
          onChange={query => this.setState({ query })}
          />
        <ul>
          {
            albums
              .filter(album => album.title.includes(query))
              .slice(0, this.props.limit)
              .map(album =>
                <Album key={album.id} {...album} />
              )
          }
        </ul>
      </div>
    );
  }

  static propTypes = {
    limit: PropTypes.number
  };

  static defaultProps = {
    limit: 20
  };
};

export default AlbumList;