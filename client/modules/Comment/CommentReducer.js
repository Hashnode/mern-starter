import {
  COMMENTS_UPLOADED,
  COMMENT_ADDED,
  COMMENT_DELETED,
  COMMENT_UPDATED,
} from './CommentActions';

export default function commentsReducer(state = [], action) {
  switch (action.type) {
    case COMMENTS_UPLOADED: {
      return action.payload;
    }
    case COMMENT_ADDED: {
      return [action.payload.comment, ...state];
    }
    case COMMENT_DELETED: {
      const { id } = action.payload;
      return state.filter(comment => comment._id !== id);
    }
    case COMMENT_UPDATED: {
      const { comment } = action.payload;
      const index = state.findIndex(item => item._id === comment._id);

      return [
        ...state.slice(0, index),
        comment,
        ...state.slice(index + 1, state.length),
      ];
    }
    default:
      return state;
  }
}

export function getComments(state) {
  return state.comments.sort((a, b) => {
    const aDate = new Date(a.created);
    const bDate = new Date(b.created);

    return bDate.getTime() - aDate.getTime();
  });
}
