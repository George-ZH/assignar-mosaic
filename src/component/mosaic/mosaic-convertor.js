import React, { Component } from 'react';
import Mosaic from './mosaic';

//const imageSource = 'data:image/png;base64, ...'; //requires base64 encoded image

// If you don't pass a `tileRenderer` function the
// component will render each tile with a boring box.
const tileRenderer = props => (
  <circle cx={props.x} cy={props.y} r={6} fill={props.fill} key={props.key} />
);

class MosaicConvertor extends Component {
  render() {
    if (!this.props.photoSource) {
        return <div> Converting ... </div>
    }

    return (
      <Mosaic src={this.props.photoSource} tileSize={12} width={600} height={500} tileRenderer={tileRenderer} />
    )
  }

};

////////// Link //////////

export default MosaicConvertor;
