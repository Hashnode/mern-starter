/* eslint no-unused-vars: 0 */
import * as ActionTypes from '../constants/constants';

export function addPost(name, title, content) {
  return {
    type: ActionTypes.ADD_POST,
    name,
    title,
    content,
  };
}

export function changeSelectedPost(title) {
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    title,
  };
}
