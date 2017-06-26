// code from https://github.com/chitchu/react-mosaic/
// only use for learning purpose

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getRowColumnIterator,
  getCanvasContext,
  getImageObj,
  countColumnsAndRows,
  getAverageRGB,
  decimalToHex
} from './mosaicutils';

import {
  convertingElement
} from '../util/util.elements';

/*
 * @type Class / React Component
 * @name Mosaic
 *
 * @description
 * convert image to mosaic
 *
 * @param src {string} link/base64 code, but link will not be converted
 * @param tileSize {number}
 * @param width {number}
 * @param height {number}
 * @param tileRenderer {func}
 *
 * @example
 * <Mosaic src={photoSource}
 *         tileSize={12}
 *         width={500}
 *         height={500}
 *         tileRenderer={tileRendererFunc}
 * />
 */
class Mosaic extends Component {
  constructor(){
    super();
    this.state = {
      analyseComplete: false,
      isConverting: true,
      tileList: [],
      columns: 0,
      rows: 0,
      width: 0,
      height: 0
    };
  }

  componentWillReceiveProps() {
    this.setState({ analyseComplete: false, tileList: [] });
  }

  componentDidUpdate() {
    if (!this.state.analyseComplete) {
      this.converting();
    }
  }

  componentDidMount() {
    if (!this.state.analyseComplete && this.props.src) {
      this.converting();
    }
  }
  
  converting() {
    getImageObj(this.props.src || '').then(imageObj => {
      const { width, height } = imageObj;
      const context = getCanvasContext(width, height);
      const { columns, rows } = countColumnsAndRows(
        width,
        height,
        this.props.tileSize,
        this.props.tileSize
      );

      context.drawImage(imageObj, 0, 0, width, height);

      let tileList = [];

      const avgColours = getAverageRGB(
        imageObj,
        this.props.tileSize,
        this.props.tileSize
      );

      const { tileSize } = this.props;

      const iterateRowColumns = getRowColumnIterator();

      // See: Threads
      iterateRowColumns.send({ columns, rows }).on('message', ({
        type,
        index
      }) => {
        const x = (index >= columns ? index % columns : index) * tileSize;
        const y = Math.floor(index / columns) * tileSize;
        const hex = `${decimalToHex(avgColours[index * 4])}${decimalToHex(avgColours[index * 4 + 1])}${decimalToHex(avgColours[index * 4 + 2])}`;
        const fill = `#${hex}`;
        const tile = this.props.tileRenderer &&
          typeof this.props.tileRenderer === 'function'
          ? this.props.tileRenderer({
              x,
              y,
              tileSize,
              fill,
              color: hex,
              key: index
            })
          : <rect
              x={x}
              y={y}
              key={index}
              width={tileSize}
              height={tileSize}
              fill={fill}
            />;

        tileList.push(tile);

        if (typeof this.props.onProgress === 'function') {
          this.props.onProgress({
            total: rows * columns,
            current: tileList.length
          });
        }
        if (tileList.length === rows * columns) {
          this.setState(
            {
              analyseComplete: true,
              isConverting: false,
              tileList,
              columns,
              rows,
              width,
              height
            },
            this.props.onComplete
          );
          iterateRowColumns.kill();
        }
      });
    });
  }

  render() {
    const { width, height } = this.props;
    return (
      <div>
        {
            this.state.isConverting
            ? convertingElement
            : (<svg id = "mosaic-svg"
                    width={width}
                    height={height}
                    viewBox={`0 0 ${width} ${height}`}
                    xmlns="http://www.w3.org/2000/svg"
                    style={this.props.style}
              >
                {this.state.tileList}
              </svg>)
        }
      </div>

    );
  }
}

////////// /////////

Mosaic.propTypes = {
  src: PropTypes.string.isRequired,
  tileSize: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onProgress: PropTypes.func,
  tileRenderer: PropTypes.func
};

export default Mosaic;
