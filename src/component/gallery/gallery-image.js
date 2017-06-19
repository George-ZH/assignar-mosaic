import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import { openPhotoModal, closePhotoModal } from '../../actions/photos';
import ModalImage from '../modal/modal-image';

// css
import './gallery.css';

class GalleryImage extends Component {
  render(){
    let photo = this.props.photo;
    let openModal = this.props.isOpenModal.open && this.props.isOpenModal.key === photo.id;

    return (
      <div className="col-md-12">
        <div className="gallery-image">
          <div className="col-md-2 image-container">
            <img className="image-sm img-thumbnail"
                 src={photo.link}
                 alt="Card"
                 onClick={() => this.openModal()}
            />
          </div>
          <div className="col-md-10 border-left padding-top-10">
            <div className="image-title"> {photo.title} </div>
            <br/><br/>
            <div className="image-title"> Publish: {this.convertDatetimeToString(photo.datetime)} </div>
            <br/>
            <div className="image-title"> Comments: {photo.comment_count || 0} </div>
          </div>
        </div>
        <ModalImage isOpen={openModal}
                    photo={photo}
                    onClose={() => this.closeModal()}
                    action={(data) => this.uploadMosaic(data)}
        />
      </div>
    );
  }

  ////////// Methods /////////

  openModal() {
    this.props.openPhotoModal(this.props.photo.id);
    // do something else
  }

  closeModal() {
    this.props.closePhotoModal(this.props.photo.id);
    // do something else
  }

  convertDatetimeToString(num){
    let d = new Date(num*1000);
    return `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
  }
}

////////// link //////////

GalleryImage.propTypes = {
  photo : PropTypes.object.isRequired,
  isOpenModal : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
      isOpenModal : state.photoModalIsOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPhotoModal: (id) => dispatch(openPhotoModal(id)),
        closePhotoModal: () => dispatch(closePhotoModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryImage);
