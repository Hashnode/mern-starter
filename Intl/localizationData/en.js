export default {
  locale: 'en',
  messages: {
    siteTitle: 'MERN Starter Blog',
    addPost: 'Add Post',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deletePost: 'Delete Post',
    createNewPost: 'Create new post',
    authorName: 'Author\'s Name',
    postTitle: 'Post Title',
    postContent: 'Post Content',
    submit: 'Submit',
    addComment: 'Add comment',
    editComment: 'Edit comment',
    deleteComment: 'Delete comment',
    emptyComments: 'No comments added yet. Let\'s write something awesome!',
    makeComment: `{count, plural,
    	  =0 {Add first comment}
    	  other {See all}
    	}`,
    commentForm: {
      author: {
        label: 'Comment Author',
        placeholder: 'Write your name here',
      },
      content: {
        label: 'Comment body',
        placeholder: 'Place your thoughts here',
      },
    },
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
