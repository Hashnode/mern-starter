import React from 'react';
import ReactDOM from 'react-dom';
//imagine that we receive some data from db

let data = [
  {id: 1, author: "Peter", text: "Hello"},
  {id: 2, author: "Ivan", text: "Hi"}
];

let CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    let comments = this.state.data;
comment.id = Date.now();
let newComments = comments.concat([comment]);
this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
      this.loadCommentsFromServer();
      setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

  render: function() {
    return (
      <div className="commentBox">
      <h1>Comments</h1>
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
ReactDOM.render(
//<CommentBox data={data} />,
<CommentBox url="/api/comments" />,
  document.getElementById('content')
);

let CommentList = React.createClass({
  render: function() {

    let commentNodes = this.props.data.map(function(comment) {
         return (
           <Comment author={comment.author} key={comment.id}>
             {comment.text}
           </Comment>
         );
       });

    return (
      <div className="commentList">
      <Comment author="Pete Hunt">This is one comment</Comment>
      <Comment author="Jordan Walke">This is *another* comment</Comment>
      </div>
    );
  }
});

let CommentForm = React.createClass({
  getInitialState: function() {
     return {author: '', text: ''};
   },
   handleAuthorChange: function(e) {
     this.setState({author: e.target.value});
   },
   handleTextChange: function(e) {
     this.setState({text: e.target.value});
   },

   handleSubmit: function(e) {
     e.preventDefault();
     var author = this.state.author.trim();
     var text = this.state.text.trim();
     if (!text || !author) {
       return;
     }
     this.props.onCommentSubmit({author: author, text: text});
     this.setState({author: '', text: ''});

   },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
      <input
               type="text"
               placeholder="Your name"
               value={this.state.author}
               onChange={this.handleAuthorChange}
             />
             <input
               type="text"
               placeholder="Say something..."
               value={this.state.text}
               onChange={this.handleTextChange}
             />
             <input type="submit" value="Post" />
           </form>
    );
  }
});

let Comment = React.createClass({
  rawMarkup: function() {
  var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
  return { __html: rawMarkup };
},

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        //if we want to add markdown
        //first add marked library
      //  <span dangerouslySetInnerHTML={this.rawMarkup()} />
        {this.props.children}
      </div>
    );
  }
});
