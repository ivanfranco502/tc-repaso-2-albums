import React from 'react';
import PropTypes from 'prop-types';

const Photo = ({ title, thumbnailUrl }) => (
  <li>
    <img src={thumbnailUrl} />
    {title}
  </li>
);

Photo.propTypes = {
  title: PropTypes.string,
  thumbnailUrl: PropTypes.string
};

export default Photo;