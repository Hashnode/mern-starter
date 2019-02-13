import callApi from '../../util/apiCaller';

export const COMMENTS_UPLOADED = 'COMMENTS_UPLOADED';
export const COMMENT_ADDED = 'COMMENT_ADDED';
export const COMMENT_UPDATED = 'COMMENT_UPDATED';
export const COMMENT_DELETED = 'COMMENT_DELETED';

export function commentsUploaded(comments) {
  return {
    type: COMMENTS_UPLOADED,
    payload: comments,
  };
}

export function fetchComments(pid) {
  return dispatch => {
    return callApi(`comments/${pid}`)
      .then(res => dispatch(commentsUploaded(res.comments)));
  };
}

export function commentAdded(comment) {
  return {
    type: COMMENT_ADDED,
    payload: {
      comment,
    },
  };
}

export function createComment({ author, text, relatedPost }) {
  return dispatch => {
    return callApi('comments', 'post', {
      comment: {
        author,
        text,
        relatedPost,
      },
    }).then(res => dispatch(commentAdded(res.comment)));
  };
}

export function commentUpdated(comment) {
  return {
    type: COMMENT_UPDATED,
    payload: {
      comment,
    },
  };
}

export function updateComment({ cid, author, text }) {
  return dispatch => {
    return callApi(`comments/${cid}`, 'PATCH', {
      patch: {
        author,
        text,
      },
    }).then(res => dispatch(commentUpdated(res.comment)));
  };
}

export function commentDeleted(id) {
  return {
    type: COMMENT_DELETED,
    payload: {
      id,
    },
  };
}

export function deleteComment(cid) {
  return dispatch => {
    return callApi(`comments/${cid}`, 'delete')
      .then(() => dispatch(commentDeleted(cid)));
  };
}
