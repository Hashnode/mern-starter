/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormattedMessage } from "react-intl";
import PostCommentsBlock from "../PostCommentsComponents/PostCommentsBlock.jsx";

// Import Style
import styles from "./PostListItem.css";

const PostListItem = (props) => {
  return (
    <div className={styles["single-post"]}>
      <h3 className={styles["post-title"]}>
        <Link to={`/posts/${props.post.slug}-${props.post.cuid}`}>
          {props.post.title}
        </Link>
      </h3>
      <p className={styles["author-name"]}>
        <FormattedMessage id="by" /> {props.post.name}
      </p>
      <p className={styles["post-desc"]}>{props.post.content}</p>
      <p className={styles["post-action"]}>
        <a href="#" onClick={props.onDelete}>
          <FormattedMessage id="deletePost" />
        </a>
      </p>
      <PostCommentsBlock post={props.post} commentsData={certainCommentsData} />
      <hr className={styles.divider} />
    </div>
  );
};
/* eslint-enable */
PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostListItem;
