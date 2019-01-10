// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_COMMENT_MODAL = 'TOGGLE_ADD_COMMENT_MODAL';
export const TOGGLE_EDIT_COMMENT_MODAL = 'TOGGLE_EDIT_COMMENT_MODAL';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleAddCommentModal() {
  return {
    type: TOGGLE_ADD_COMMENT_MODAL,
  };
}

export function toggleEditCommentModal() {
  return {
    type: TOGGLE_EDIT_COMMENT_MODAL,
  };
}
