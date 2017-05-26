// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export function toggleLogin() {
  return {
    type: TOGGLE_LOGIN,
  };
}
