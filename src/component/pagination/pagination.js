import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// custome
import {
  photosChangePage
} from '../../actions/photos';

// css
import './pagination.css';

/*
 * @type Class / React Component
 * @name Pagination
 *
 * @description
 * pagination component, max 10 page number show up
 *
 * @param pagination {object} a JSON object, include
 * - total
 * - pages
 * - perPage
 * @param onPageChange {func} a call back when user change page
 *
 * @example
 * <Pagination pagination={isOpenModal}
 *             onPageChange={<callback When User Click different page NO.>}
 * />
 */

class Pagination extends Component {
  render(){
    return (
      <div className="col-md-6 padding-top-20 padding-bottom-20">
        {this.generatePageNumberElements()}
      </div>
    );
  }

  ////////// Methods /////////

  /* @type method of class GalleryContainer
   * @name handleClick
   *
   * @description
   * dispatch page update, update the state of currentpage
   */
  handleClick(number) {
    number = Math.max(number, 1);
    number = Math.min(number, this.props.pagination.pages);

    this.props.photosChangePage(number);
  }

  /* @type method of class GalleryContainer
   * @name generatePageNumberElements
   *
   * @description
   * generate <li> element
   */
  generatePageNumberElements() {
      if (this.props.pagination.total > 0) {
        let numbers = this.generatePageNumbers(this.props.pagination.pages);

        return (
          <div className="pagination-container">
            <li className="page-previous" onClick={() => this.handleClick(this.props.currentPage-1)}>
              <span className="glyphicon glyphicon-menu-left"></span>
            </li>
            {
              numbers.map((number)=>{
                return <li className={"page-number " + (number === this.props.currentPage ? "page-active" : "")}
                           key={number}
                           onClick={() => this.handleClick(number)}
                       >
                          {number}
                       </li>
              })
            }
            <li className="page-next" onClick={() => this.handleClick(this.props.currentPage+1)}>
              <span className="glyphicon glyphicon-menu-right"></span>
            </li>
          </div>
        );
      } else {
        return <div className="pagination-container"></div>
      }
  }

  /* @type method of class GalleryContainer
   * @name generatePageNumbers
   *
   * @description
   * build a array include all numbers should be displayed
   *
   * @return numbers {array} for show up
   */
  generatePageNumbers(countOfPages) {
    let numbers = [];

    if (countOfPages <= pageColumns) {
      for(let i = 1; i <= countOfPages; i++) {
        numbers.push(i);
      }
    } else {
      let middle = pageColumns/2;

      for(let i = 1; i <= middle; i++) {
        numbers.push(i);
      }

      numbers.push('...');

      for(let x = countOfPages - middle; x <= countOfPages; ++x){
        numbers.push(x);
      }
    }

    return numbers;
  }

}

////////// //////////

const pageColumns = 10;

//export default Pagination;

////////// link //////////

Pagination.propTypes = {
  generatePageNumbers : PropTypes.func.isRequired,
  generatePageNumberElements : PropTypes.func.isRequired,
  onPageChange : PropTypes.func,
  pagination : PropTypes.object.isRequired,
  currentPage : PropTypes.number.isRequired,
}

const mapStateToProps = (state) => {
    return {
        currentPage : state.photosChangePage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        photosChangePage: (pageNo) => dispatch(photosChangePage(pageNo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
