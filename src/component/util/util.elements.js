import React from 'react';

export const loadingElementCircle = (
  <div className="col-md-12">
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  </div>
);

export const loadingElementRect = (
  <div className="col-md-12">
    <div className="spinner">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  </div>
);

export const errorElement = (
  <div className="col-md-12 padding-top-20">
    <div className="errorAlert">
      <p>Sorry! There was an error loading the items</p>
    </div>
  </div>
);
