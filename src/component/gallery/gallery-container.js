import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import {
  errorElement,
  loadingElement
} from '../util/util.elements';

import {
  photosFetchData
} from '../../actions/photos';

import GalleryImage from './gallery-image';
import Pagination from '../pagination/pagination';

// css
import './gallery.css';

/*
 * @type Class / React Component
 * @name GalleryContainer
 *
 * @description
 * show top 10 gallery as list, including pagination
 *
 * @example
 * <GalleryContainer />
 */
class GalleryContainer extends Component {
  constructor(){
    super();
    this.pagination = {
      total: 0,
      pages: 10,
      perPage: 10,
    };
  }

  // fetch gallery from Imgur after this component be mounted
  componentDidMount() {
    this.props.fetchData();
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

  /* @type method of class GalleryContainer
   * @name fetchElement
   * @description
   * return different according to current fetching status.
   */
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
        return <GalleryImage photo={photo} key={photo.id} />
      });
    }
  }

  /* @type method of class GalleryContainer
   * @name splitPhotos
   * @description
   * return part of photos array, according to current page
   */
  splitPhotos() {
    const page = this.props.currentPage;

    let start = (page - 1) * this.pagination.perPage;
    let end = Math.min((page) * this.pagination.perPage, this.pagination.total);

    return this.props.photos.slice(start, end);
  }

}

//////// - Link - ////////

GalleryContainer.propTypes = {
    fetchData : PropTypes.func.isRequired,
    photos : PropTypes.array.isRequired,
    hasErrored : PropTypes.bool.isRequired,
    isFetching : PropTypes.bool.isRequired,
    currentPage : PropTypes.number.isRequired
};

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
        fetchData: () => dispatch(photosFetchData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryContainer);
