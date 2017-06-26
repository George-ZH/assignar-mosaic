import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import {
  photoUploading,
  photoChangeURL
} from '../../actions/photos';

import {
  loadingElementCircle
} from '../util/util.elements';

import {
  convertToJPEGBase64
} from '../util/util.funcs';

import MosaicConvertor from '../mosaic/mosaic-convertor';

// css
import './modal-image.css';

/*
 * @type Class / React Component
 * @name ModalImage
 *
 * @description
 * - a popup window, full screen, show current selected image, then convert to
 * mosaic version
 * - allow user choose upload mosaic version to imgur
 * - allow user upload their own image
 *
 * @param isOpen {bool} close/open this modal
 * @param photo {object} a JSON object about the photo
 * @param onClose {func} a call back when user close this modal
 *
 * @example
 * <ModalImage isOpen={isOpenModal}
 *             photo={photo}
 *             onClose={<callbackWhenCloseWindow>}
 * />
 */

class ModalImage extends Component {
  render() {
    if (!this.props.isOpen) {
      return <div></div>;
    }

    if (!this.props.photoURL) {
      convertToJPEGBase64(this.props.photo.link, this.props.photoChangeURL);
    }

    return (
      <div className="modal-image">
        <div className="col-md-12 padding-top-20 padding-bottom-20 ">
          <span className="	glyphicon glyphicon-remove-circle icon-lg"
                onClick={e => this.close(e)}
          >
          </span>
        </div>
        <div className="col-md-12 image-modal-container">
          <div className="col-md-6 col-xs-6">
            { this.props.photoURL
              ? (<img className="image-lg img-thumbnail"
                   src={this.props.photoURL.link}
                   alt={this.props.photo.id}
                 />)
              : (<div className="img-thumbnail">{loadingElementCircle}</div>)
            }
          </div>
          <div className="col-md-6 col-xs-6">
            <div className="image-lg img-thumbnail">
              { this.props.photoURL
                ? (<MosaicConvertor photoSource={this.props.photoURL}/>)
                : (loadingElementCircle)
              }
            </div>
          </div>
        </div>
        <div className="col-md-12 padding-top-20 padding-bottom-20">
          <div className="col-md-6 col-xs-6">
            <button className="btn btn-primary col-md-10" style={{ float: "right"}}
                    onClick={() => this.uploadMosaic()}
            >
                { this.props.isUploading ? "Uploading ..." : "Upload Mosaic Version" }
            </button>
          </div>
          <div className="col-md-6 col-xs-6">
            <div className="fileUpload btn btn-primary col-md-10">
              <span>Upload Your Own Picture</span>
              <input className="upload" type='file' onChange={(e) => this.readURL(e)} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  ////////// Methods ////////

  /* @type method of class GalleryContainer
   * @name close
   *
   * @description
   * clean photo link, then execute passed callback
   * close this modal
   *
   */
  close(e) {
    e.preventDefault();

    this.props.photoChangeURL(null);

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  /* @type method of class GalleryContainer
   * @name uploadMosaic
   * @description
   * upload mosaic version (base64) to Imgur
   */
  uploadMosaic() {
    let mosaicElement = document.getElementById("mosaic-svg");
    let svgData = new XMLSerializer().serializeToString(mosaicElement);

    convertToJPEGBase64(`data:image/svg+xml;base64,${btoa(svgData)}`, this.props.photoUploading);
  }

  /* @type method of class GalleryContainer
   * @name readURL
   * @description
   * show up the image user uploaded
   */
  readURL(e) {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      convertToJPEGBase64(
        reader.result,
        this.props.photoChangeURL
      );
    }

    reader.readAsDataURL(file);
  }
}

////////// - Link - //////////

ModalImage.propTypes = {
  photoUploading : PropTypes.func.isRequired,
  photoChangeURL : PropTypes.func.isRequired,
  onClose : PropTypes.func,
  isOpen : PropTypes.bool.isRequired,
  isUploading: PropTypes.bool.isRequired,
  uploadErrored : PropTypes.bool.isRequired,
  photo : PropTypes.object.isRequired,
  photoURL : PropTypes.object,

}

const mapStateToProps = (state) => {
    return {
        uploadErrored : state.photosUploadErrored,
        photoURL : state.photoDidChangeURL,
        isUploading : state.photosIsUploading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        photoUploading: (url, data) => dispatch(photoUploading(url, data)),
        photoChangeURL: (url) => dispatch(photoChangeURL(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);
