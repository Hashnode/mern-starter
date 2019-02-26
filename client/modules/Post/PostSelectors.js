import { createSelector } from 'reselect';

export const commentFormValuesSelector = state =>
  state.form.addCommentForm && state.form.addCommentForm.values;

export const authorNameSelector = createSelector(
  commentFormValuesSelector,
  values => {
    return values && values.authorName ? values.authorName : '';
  }
);

export const commentSelector = createSelector(
  commentFormValuesSelector,
  values => {
    return values && values.comment ? values.comment : '';
  }
);

export const isCommentFormVisibleSelector = state => {
  // render on server error ".addCommentForm is undefined"
  return !!state.posts.addCommentForm && state.posts.addCommentForm.isVisible;
};

export const isCommentFormVisiblePostIdSelector = (state, props) => {
  // render on server error ".addCommentForm is undefined"
  return !!state.posts.addCommentForm
    &&
   props.post._id === state.posts.addCommentForm.postId;
};

export const isVommentFormVisibleInPostSelector = createSelector(
  isCommentFormVisibleSelector,
  isCommentFormVisiblePostIdSelector,
  (isCommentFormVisible, isCommentFormVisiblePostId) =>
    isCommentFormVisible && isCommentFormVisiblePostId
);
