import React, { Component } from 'react';
import ModalImage from '../modal/modal-image';

// css
import './gallery.css';

class GalleryImage extends Component {
  constructor() {
    super();
    this.state = {isModalOpen: false};
  }

  render(){
    let photo = this.props.photo;

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
        <ModalImage isOpen={this.state.isModalOpen}
                    photo={photo}
                    onClose={() => this.closeModal()}
                    action={(data) => this.uploadMosaic(data)}
        />
      </div>
    );
  }

  ////////// Methods /////////

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  convertDatetimeToString(num){
    let d = new Date(num*1000);
    return `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
  }
}

export default GalleryImage;
