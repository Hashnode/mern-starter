import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  addCommentSuccess,
  addCommentFailure,
  editCommentSuccess,
  editCommentFailure,
  deleteCommentSuccess,
  deleteCommentFailure,
} from '../CommentsActions';

const comment1 = { cuid: '1234567890', postId: 'f34gb2bh24b24b2', author: 'John Doe', content: 'John Doe said Boo!' };
const comment2 = { cuid: '0987654321', postId: 'f34gb2bh24b24b2', author: 'Jane Doe', content: 'Jane Doe is laughing the table...' };

const error = new Error('Mock error');

test('should return the correct type for addCommentSuccess', actionTest(
  addCommentSuccess,
  comment1,
  { type: ADD_COMMENT_SUCCESS, comment: comment1 },
));

test('should return the correct type for addCommentFailure', actionTest(
  addCommentFailure,
  error,
  { type: ADD_COMMENT_FAILURE, error },
));

test('should return the correct type for editCommentSuccess', actionTest(
  editCommentSuccess,
  comment2,
  { type: EDIT_COMMENT_SUCCESS, comment: comment2 },
));

test('should return the correct type for editCommentFailure', actionTest(
  editCommentFailure,
  error,
  { type: EDIT_COMMENT_FAILURE, error },
));

test('should return the correct type for deleteCommentSuccess', actionTest(
  deleteCommentSuccess,
  comment1,
  { type: DELETE_COMMENT_SUCCESS, comment: comment1 },
));

test('should return the correct type for deleteCommentFailure', actionTest(
  deleteCommentFailure,
  error,
  { type: DELETE_COMMENT_FAILURE, error },
));
