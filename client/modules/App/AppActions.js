// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const SET_AUTHOR = 'SET_AUTHOR';


// Export Actions
export function setAuthor(author) {
  return {
    type: SET_AUTHOR,
    payload: author,
  };
}

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}
