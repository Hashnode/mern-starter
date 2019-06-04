import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { FormattedMessage } from "react-intl";
import Input from "./Input";
import CommentList from "./CommentList";
import update from "react-addons-update";

// Import Style
import styles from "./PostListItem.css";

function PostListItem(props) {
  const [comment, setComment] = useState([]);
  const [show, setShow] = useState(false);

  const getComment = (a, b) => {
    const id = Math.round(Math.random() * 10000);
    const obj = { name: a, text: b, id };

    setComment([...comment, obj]);
    setShow(!show);
  };

  const updateComment = (id, text) => {
    const index = comment.findIndex(value => value.id === id);
    const clone = comment;
    const edit = update(clone, {
      [index]: {
        text: { $set: text }
      }
    });
    setComment(edit);
  };

  const deleteComment = id => {
    const newList = comment.filter(val => val.id !== id);
    setComment(newList);
  };

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
      <div className={styles["wrapper-div"]}>
        <p className={styles["post-action"]}>
          <a href="#" onClick={props.onDelete}>
            <FormattedMessage id="deletePost" />
          </a>
        </p>
        <p className={styles["post-action"]}>
          <a href="#" onClick={() => setShow(!show)}>
            <FormattedMessage id="Add Comment" />
          </a>
        </p>
      </div>
      {show && <Input getComment={getComment} />}
      {!show && (
        <CommentList
          updateComment={updateComment}
          deleteComment={deleteComment}
          arrComment={comment}
        />
      )}
      <hr className={styles.divider} />
    </div>
  );
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default PostListItem;
