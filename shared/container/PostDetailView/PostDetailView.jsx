import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from '../../components/PostListItem/PostListItem.css';
import cssModules from 'react-css-modules';

class PostDetailView extends Component {

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
        <div styleName="container">
          <div styleName="single-post post-detail">
            <h3 styleName="post-title">{this.props.post.title}</h3>
            <p styleName="author-name">By {this.props.post.name}</p>
            <p styleName="post-desc">{this.props.post.content}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

PostDetailView.need = [(params) => {
  return Actions.getPostRequest.bind(null, params.slug)();
}];

PostDetailView.contextTypes = {
  router: React.PropTypes.object,
};

PostDetailView.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    post: (store.post),
  };
}

export default connect(mapStateToProps)(cssModules(PostDetailView, styles, { allowMultiple: true }));
