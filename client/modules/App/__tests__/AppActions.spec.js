import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_ADD_POST, toggleAddPost } from '../AppActions';

test('should return the correct type for toggleAddPost', actionTest(toggleAddPost, null, { type: TOGGLE_ADD_POST }));
