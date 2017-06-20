import React, { Component } from 'react';
import Mosaic from './mosaic';
import PropTypes from 'prop-types';

const tileRenderer = props => (
  <circle cx={props.x} cy={props.y} r={6} fill={props.fill} key={props.key} />
);


/*
 * @type Class / React Component
 * @name MosaicConvertor
 *
 * @param photoURL {string} image base64 code
 * @description
 * Try to convert image to mosaic
 *
 * @example
 * <MosaicConvertor photoSource={photoURL}/>
 */
class MosaicConvertor extends Component {
  render() {
    if (!this.props.photoSource.link) {
        return <div> Converting ... </div>
    }

    return (
      <Mosaic src={this.props.photoSource.link}
              tileSize={12}
              width={this.props.photoSource.width}
              height={this.props.photoSource.height}
              tileRenderer={tileRenderer}
      />
    )
  }

};

////////// Link //////////

MosaicConvertor.propTypes = {
  photoSource: PropTypes.object,
}

// link state and props if needed

export default MosaicConvertor;
