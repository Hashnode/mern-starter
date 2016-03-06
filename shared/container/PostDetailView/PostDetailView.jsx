import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, getPostRequest }from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
    this.props.fetchPosts();
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

PostDetailView.need = [(params) => {
  return getPostRequest.bind(null, params.slug)();
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
  fetchPosts: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    post: { post },
  } = state;

  return {
    post,
  };
}

export default connect(mapStateToProps, {
  fetchPosts,
  getPostRequest,
})(PostDetailView);
