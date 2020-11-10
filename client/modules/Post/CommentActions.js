// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
}

