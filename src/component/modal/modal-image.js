import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import { photoUploading, photoChangeURL } from '../../actions/photos';
import MosaicConvertor from '../mosaic/mosaic-convertor';

// css
import './modal-image.css';

class ModalImage extends Component {
  render() {
    if (!this.props.isOpen) {
      return <div></div>;
    }

    let photoURL = this.props.photoURL || this.props.photo.link;

    return (
      <div className="modal-image">
        <div className="col-md-12 padding-top-20 padding-bottom-20 ">
          <span className="	glyphicon glyphicon-remove-circle icon-lg"
                onClick={e => this.close(e)}
          >
          </span>
        </div>
        <div className="col-md-12 image-modal-container">
          <div className="col-md-6">
            <img className="image-lg img-thumbnail"
                 src={photoURL}
                 alt={this.props.photo.id}
            />
          </div>
          <div className="col-md-6">
            <div className="image-lg img-thumbnail">
              <MosaicConvertor photoSource={photoURL}/>
            </div>
          </div>
        </div>
        <div className="col-md-12 padding-top-20 padding-bottom-20">
          <div className="col-md-6">
            <button className="btn btn-primary col-md-10" style={{ float: "right"}}
                    onClick={() => this.uploadMosaic()}
            >
                Upload Mosaic Version
            </button>
          </div>
          <div className="col-md-6">
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

  close(e) {
    e.preventDefault();

    this.props.photoChangeURL(null);
    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  uploadMosaic() {
    console.log('upload');

    this.props.photoUploading("https://api.imgur.com/3/image");
  }

  readURL(e) {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.props.photoChangeURL(reader.result);
    }

    reader.readAsDataURL(file);
  }
}

////////// link //////////

ModalImage.propTypes = {
  photoUploading : PropTypes.func.isRequired,
  photoChangeURL : PropTypes.func.isRequired,
  uploadErrored : PropTypes.bool.isRequired,
  photoURL : PropTypes.string,
}

const mapStateToProps = (state) => {
    return {
        uploadErrored : state.photosUploadErrored,
        photoURL : state.photoDidChangeURL,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        photoUploading: (url) => dispatch(photoUploading(url)),
        photoChangeURL: (url) => dispatch(photoChangeURL(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);
