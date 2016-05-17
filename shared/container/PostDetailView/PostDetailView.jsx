import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

@connect(store => {
  return {
    post: store.post
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
    }),
    dispatch: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  componentDidMount() {
    this.props.dispatch(Actions.getPostRequest(this.props.params.slug));
  }

  handleLogoClick() {
    this.props.dispatch(Actions.fetchPosts());
  }

  render() {
    var {post} = this.props;
    return (
      <div>
        <Header onClick={() => {}} handleLogoClick={::this.handleLogoClick}/>
        {
          post ?
            <div className="container">
              <div className="single-post post-detail">
                <h3 className="post-title">{post.title}</h3>
                <p className="author-name">By {post.name}</p>
                <p className="post-desc">{post.content}</p>
              </div>
            </div> :
            <span></span>
        }
        <Footer />
      </div>
    );
  }
}
