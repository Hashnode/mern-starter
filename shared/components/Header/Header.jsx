import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    handleLogoClick: PropTypes.func,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  render() {
    var {props, context} = this;
    return (
      <div className="header">
        <div className="header-content">
          <h1 className="site-title">
            <Link to="/" onClick={props.handleLogoClick}>MERN Starter Blog</Link>
          </h1>
          {
            context.router.isActive('/', true)
              ? <a className="add-post-button" href="#" onClick={props.onClick}>Add Post</a>
              : null
          }
        </div>
      </div>
    );
  }
}
