const defaultState = {
  currentPost: {},
  posts: [],
  isLoading: true,
  isError: false,
};

export default function (state = defaultState, action) {
  let newState = state;

  switch (action.type) {
    case 'FETCH_ALL_POSTS_REQUEST': {
      newState = {
        ...state,
        isLoading: true,
        isError: false,
        currentPost: {},
      };

      break;
    }

    case 'FETCH_ALL_POSTS_SUCCESS': {
      newState = {
        ...state,
        isLoading: false,
        isError: false,
        posts: [...action.posts],
      };

      break;
    }

    case 'FETCH_ALL_POSTS_FAILURE': {
      newState = {
        ...state,
        isLoading: false,
        isError: true,
      };

      break;
    }

    case 'FETCH_SINGLE_POST_REQUEST': {
      newState = {
        ...state,
        isLoading: true,
        isError: false,
      };

      break;
    }

    case 'FETCH_SINGLE_POST_SUCCESS': {
      newState = {
        ...state,
        isLoading: false,
        isError: false,
        currentPost: {
          ...action.post,
        },
      };

      break;
    }

    case 'FETCH_SINGLE_POST_FAILURE': {
      newState = {
        ...state,
        isLoading: false,
        isError: true,
      };

      break;
    }

    case 'REMOVE_POST': {
      newState = {
        ...state,
        posts: state.posts.filter(post => post.slug !== action.slug),
      };

      break;
    }

    case 'ADD_POST': {
      newState = {
        ...state,
        posts: [action.post, ...state.posts],
      };

      break;
    }

    default: {
      newState = state;
    }
  }

  return newState;
}
