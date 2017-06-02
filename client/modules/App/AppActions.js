import callApi from '../../util/apiCaller';

// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

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

export function signIn(profile) {
  return {
    type: SIGN_IN,
    profile,
  };
}

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function signInRequest(profile) {
  return () => {
    return callApi('signin', 'post', {
      profile,
    });
  };
}
