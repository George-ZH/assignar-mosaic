import React, { Component} from 'react';
import './header.css';
import logo from '../../asset/image/logo.png';

class Header extends Component {

  render(){
    return (
      <div className="col-md-12 header">
        <div className="col-md-4 left padding-top-5">
          <img src={logo} className="logo-sm" alt="logo"/><br/>
        </div>
        <div className="col-md-8 right">
          <span className="glyphicon glyphicon-align-justify glyphicon-custom"></span>
        </div>
      </div>
    )
  }
}

export default Header;
