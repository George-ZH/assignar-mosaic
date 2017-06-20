import React from 'react';

export const loadingElement = (
  <div className="col-md-12">
    <div className="spinner">
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
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
