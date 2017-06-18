import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import { photosFetchData } from '../../actions/photos';
import GalleryImage from './gallery-image';
import Pagination from '../pagination/pagination';

// css
import './gallery.css';

class GalleryContainer extends Component {
  constructor(){
    super();
    this.url = "https://api.imgur.com/3/gallery/r/aww";
    this.pagination = {
      total: 0,
      pages: 10,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.props.fetchData(this.url);
  }

  render(){
    let photosElement = this.fetchElement();

    return (
      <div className="gallery-container">
        <Pagination pagination={this.pagination}
                    onPageChange={(pageNo) => this.updatePhotoElement(pageNo)}
        />
        {photosElement}
      </div>
    )
  }

  ////////// Methods /////////

  fetchElement() {
    if (this.props.hasErrored) {
      return errorElement;
    }

    if (this.props.isFetching) {
      return loadingElement;
    }

    if (this.props.photos.length === 0) {
      return loadingElement;
    } else {
      this.pagination.total = this.props.photos.length;
      this.pagination.pages = Math.ceil(this.pagination.total / this.pagination.perPage);

      let photosSlice = this.splitPhotos();

      return photosSlice.map((photo) => {
        return <GalleryImage photo={photo} key={photo.id.toString()} />
      });
    }
  }

  splitPhotos() {
    const page = this.props.currentPage;

    let start = (page - 1) * this.pagination.perPage;
    let end = Math.min((page) * this.pagination.perPage, this.pagination.total);

    return this.props.photos.slice(start, end);
  }

}

//////// ////////

GalleryContainer.propTypes = {
    fetchData : PropTypes.func.isRequired,
    photos : PropTypes.array.isRequired,
    hasErrored : PropTypes.bool.isRequired,
    isFetching : PropTypes.bool.isRequired,
    currentPage : PropTypes.number.isRequired
};

const loadingElement = (
  <div className="col-md-12">
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  </div>
);

const errorElement = (
  <div className="col-md-12 padding-top-20">
    <div className="errorAlert">
      <p>Sorry! There was an error loading the items</p>
    </div>
  </div>
);

const mapStateToProps = (state) => {
    return {
        photos : state.photos,
        hasErrored : state.photosHasErrored,
        isFetching : state.photosIsFetching,
        currentPage : state.photosChangePage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(photosFetchData(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
