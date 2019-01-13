import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}

export function createComment(post) {
  return {
    type: CREATE_COMMENT,
    post,
  };
}

export function addCommentRequest(cuid, comment) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'post', {
      comment: {
        name: comment.name,
        text: comment.text,
      },
    }).then(res => {
      dispatch(createComment(res));
    });
  };
}

export function editComment(post) {
  return {
    type: EDIT_COMMENT,
    post,
  };
}

export function editCommentRequest(cuid, comment) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'put', {
      comment: {
        commentId: comment.commentId,
        name: comment.name,
        text: comment.text,
      },
    }).then(res => {
      dispatch(editComment(res));
    });
  };
}

export function deleteComment(post) {
  return {
    type: DELETE_COMMENT,
    post,
  };
}

export function deleteCommentRequest(testObj) {
  const { postID, commentID } = testObj;
  return (dispatch) => {
    return callApi(`posts/${postID}/${commentID}`, 'delete'
    ).then(res => {
      dispatch(deleteComment(res));
    });
  };
}
