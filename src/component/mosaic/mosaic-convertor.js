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
    if (!this.props.photoSource) {
        return <div> Converting ... </div>
    }

    return (
      <Mosaic src={this.props.photoSource} tileSize={12} width={500} height={500} tileRenderer={tileRenderer} />
    )
  }

};

////////// Link //////////

MosaicConvertor.propTypes = {
  photoSource: PropTypes.string,
}

// link state and props if needed

export default MosaicConvertor;
