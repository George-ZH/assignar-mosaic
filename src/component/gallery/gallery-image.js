import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import {
  openPhotoModal,
  closePhotoModal
} from '../../actions/photos';

import {
  convertDatetimeToString
} from '../util/util.funcs';

import ModalImage from '../modal/modal-image';

// css
import './gallery.css';

/*
 * @type Class / React Component
 * @name GalleryImage
 *
 * @description
 * single element for show a image, including
 * - image
 * - title
 * - publish date, in format "dd/mm/yyyy"
 * - count of Comments
 * <add more info, pls update here as well>
 *
 * @param photo {Object} a JSON object
 *
 * @example
 * <GalleryImage photo={} />
 */
class GalleryImage extends Component {
  render(){
    let photo = this.props.photo;
    let isOpenModal = this.props.modalState.open && this.props.modalState.key === photo.id;

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
            <div className="image-title"> Publish: {convertDatetimeToString(photo.datetime)} </div>
            <br/>
            <div className="image-title"> Comments: {photo.comment_count || 0} </div>
          </div>
        </div>
        <ModalImage isOpen={isOpenModal}
                    photo={photo}
                    onClose={() => this.closeModal()}
        />
      </div>
    );
  }

  ////////// Methods /////////

  /* @type method of class GalleryContainer
   * @name openModal
   * @description
   * update state, open popup modal
   */
  openModal() {
    this.props.openPhotoModal(this.props.photo.id);
    // do something else
  }

  /* @type method of class GalleryContainer
   * @name closeModal
   * @description
   * update state, close popup modal
   */
  closeModal() {
    this.props.closePhotoModal(this.props.photo.id);
    // do something else
  }
}

////////// - Link - //////////

GalleryImage.propTypes = {
  photo : PropTypes.object.isRequired,
  modalState : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
      modalState : state.photoModalIsOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openPhotoModal: (id) => dispatch(openPhotoModal(id)),
        closePhotoModal: () => dispatch(closePhotoModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryImage);
