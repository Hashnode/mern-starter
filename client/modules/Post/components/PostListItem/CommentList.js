import React from "react";
import Comment from "./Comment";

function CommentList(props) {
  return (
    <div>
      {props.arrComment.map(val => (
        <Comment
          updateComment={props.updateComment}
          deleteComment={props.deleteComment}
          key={val.id}
          name={val.name}
          text={val.text}
          id={val.id}
        />
      ))}
    </div>
  );
}

export default CommentList;
