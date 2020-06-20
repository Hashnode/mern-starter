import React from 'react';
//import PropTypes from 'prop-types';

// Import Components
import CommentListItem from './CommentListItem/CommentListItem';

const CommentList = () => {
  const comment = {
    author: 'Alex',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
  };
  return (
    <div className="listView">
      {
        // props.posts.map(post => (
        //   <CommentListItem
        //     comment={post}
        //     key={post.cuid}
        //     onDelete={() => props.handleDeletePost(post.cuid)}
        //   />
        // ))
        <CommentListItem comment={comment} />
      }
    </div>
  );
};

// CommentList.propTypes = {
//   posts: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     content: PropTypes.string.isRequired,
//     slug: PropTypes.string.isRequired,
//     cuid: PropTypes.string.isRequired,
//   })).isRequired,
//   handleDeletePost: PropTypes.func.isRequired,
// };

export default CommentList;
