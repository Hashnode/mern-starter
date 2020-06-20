// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export const addComment = (author, content) => {
  return {
    type: ADD_COMMENT,
    author,
    content,
  };
};

export const editComment = (author, content, cid) => {
  return {
    type: EDIT_COMMENT,
    author,
    content,
    cid,
  };
};

export const deleteComment = (cid) => {
  return {
    type: DELETE_COMMENT,
    cid,
  };
};
