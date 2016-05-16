import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

@connect(function (store) {
  return {
    posts: store.posts
  };
})
export default class PostDetailView extends Component {

  static propTypes = {
    post: PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  static need = [(params) => {
    return Actions.getPostRequest.bind(null, params.slug)();
  }];

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleClick() {
    this.setState({
      showAddPost: true,
    });
  }

  handleLogoClick() {
    this.props.dispatch(Actions.fetchPosts());
  }

  render() {
    return (
      <div>
        <Header onClick={function noop() {}} handleLogoClick={this.handleLogoClick}/>
        <div className="container">
          <div className="single-post post-detail">
            <h3 className="post-title">{this.props.post.title}</h3>
            <p className="author-name">By {this.props.post.name}</p>
            <p className="post-desc">{this.props.post.content}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
