/* eslint no-unused-vars: 0 */
import expect from 'expect';
import postReducer from '../redux/reducers/reducer';
import deepFreeze from 'deep-freeze';
import * as ActionTypes from '../redux/constants/constants';

describe('reducer tests', () => {
  it('action ADD_POST is working', () => {
    const stateBefore = { posts: [] };
    const stateAfter = { posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
    }] };

    const action = {
      type: ActionTypes.ADD_POST,
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(stateAfter).toEqual(postReducer(stateBefore, action));
  });
});
