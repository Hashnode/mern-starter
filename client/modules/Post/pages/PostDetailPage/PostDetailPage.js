import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { FormattedMessage } from "react-intl";

// Import Style
import styles from "../../components/PostListItem/PostListItem.css";

// Import Actions
import { fetchPost } from "../../PostActions";
import { fetchComments } from "../../CommentActions";

import CommentList from "../../components/Comments/CommentList";
import CommentCreateWidget from "../../components/Comments/CommentCreateWidget";

// Import Selectors
import { getPost } from "../../PostReducer";
import { getComments } from "../../CommentReducer";

// test data, remove after implementing server side
const comments = [
  {
    author: "Mr 1",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi doloremque maxime quia excepturi autem ipsa reprehenderit.",
    cuid: "1"
  },
  {
    author: "Mr two",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi doloremque maxime quia excepturi autem ipsa reprehenderit.",
    cuid: "2"
  },
  {
    author: "Mr 3(threeeeeeeee)",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi doloremque maxime quia excepturi autem ipsa reprehenderit.",
    cuid: "3"
  }
];
/////// end

export class PostDetailPage extends Component {
  componentDidMount() {
    // fetch comments
    //this.props.dispatch(fetchComments());
  }
  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles["single-post"]} ${styles["post-detail"]}`}>
          <h3 className={styles["post-title"]}>{this.props.post.title}</h3>
          <p className={styles["author-name"]}>
            <FormattedMessage id="by" /> {this.props.post.name}
          </p>
          <p className={styles["post-desc"]}>{this.props.post.content}</p>
        </div>
        <CommentList comments={comments} />
        <CommentCreateWidget />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
PostDetailPage.need = [
  params => {
    return fetchPost(params.cuid);
  },
  params => {
    return fetchComments(params.cuid);
  }
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    post: getPost(state, props.params.cuid),
    comments: getComments(state)
  };
}

PostDetailPage.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired
  }).isRequired
};

export default connect(mapStateToProps)(PostDetailPage);
