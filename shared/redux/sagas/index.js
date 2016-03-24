// Export all your sagas here
import { addPostSaga, deletePostSaga, fetchPostsSaga, fetchPostSaga } from './postsSaga';

export default [
  addPostSaga,
  deletePostSaga,
  fetchPostsSaga,
  fetchPostSaga,
];
