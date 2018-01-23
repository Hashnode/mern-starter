import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddPost } from '../AppReducer';
import { toggleAddPost } from '../AppActions';

test('action for TOGGLE_ADD_POST is working', reducerTest(
  appReducer,
  { showAddPost: false },
  toggleAddPost(),
  { showAddPost: true },
));

test('getShowAddPost selector', t => {
  t.is(getShowAddPost({
    app: { showAddPost: false },
  }), false);
});
