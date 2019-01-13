export default {
  locale: 'en',
  messages: {
    siteTitle: 'MERN Starter Blog',
    addPost: 'Add Post',
    hidePostForm: 'Hide Post Form',
    hideCommentForm: 'Hide Comment Form',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deletePost: 'Delete Post',
    createNewPost: 'Create new post',
    createComment: 'Create new comment',
    editComment: 'Edit Comment',
    deleteComment: 'Delete Comment',
    authorName: 'Author\'s Name',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    commentContent: 'Comment Content',
    submit: 'Submit',
    comment: `user {name} {value, plural,
        =0 {does not have any comments}
        =1 {has # comment}
        other {has # comments}
      }`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
        =0 {does not have <i style='font-style: italic'>any</i> comments}
        =1 {has <i style='font-style: italic'>#</i> comment}
        other {has <i style='font-style: italic'>#</i> comments}
      }`,
    nestedDateComment: `user {name} {value, plural,
        =0 {does not have any comments}
        =1 {has # comment}
        other {has # comments}
      } as of {date}`,
  },
};
