// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_ADD_COMMENT = 'TOGGLE_ADD_COMMENT';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleAddComment() {
  return {
    type: TOGGLE_ADD_COMMENT,
  };
}
