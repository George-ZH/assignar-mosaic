import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import { photoUploading } from '../../actions/photos';

// css
import './modal-image.css';

class ModalImage extends Component {
  render() {
    if (!this.props.isOpen) {
      return <div></div>;
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
          <div className="col-md-6">
            <img className="image-lg img-thumbnail"
                 src={this.props.photo.link}
                 alt={this.props.photo.id}
            />
          </div>
          <div className="col-md-6">
            sdfdfd
          </div>
        </div>
        <div className="col-md-12 padding-top-20 padding-bottom-20">
          <button className="btn btn-primary"
                  onClick={() => this.uploadMosaic()}
          >
              Upload Mosaic Version
          </button>
        </div>
      </div>
    )
  }

  ////////// Methods ////////

  close(e) {
    e.preventDefault();

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  uploadMosaic() {
    console.log('upload');

    this.props.photoUploading("https://api.imgur.com/3/image");
  }

}

////////// link //////////

ModalImage.propTypes = {
  photoUploading : PropTypes.func.isRequired,
  uploadErrored : PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
    return {
        uploadErrored : state.photosUploadErrored,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        photoUploading: (url) => dispatch(photoUploading(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);
