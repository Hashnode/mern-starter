import React, { PropTypes, Component } from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

@connect()
export default class PostListView extends Component {

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      cuid: PropTypes.string.isRequired,
    })).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    var { props } = this;
    return (
      <div className="listView">
        {
          props.posts.map((post, i) => (
            <PostListItem
              post={post} key={i}
              onClick={() => {
                props.dispatch(Actions.addSelectedPost(post));
              }}
              onDelete={() => {
                if (confirm('Do you want to delete this post')) { // eslint-disable-line
                  props.dispatch(Actions.deletePostRequest(post));
                }
              }}
            />
          ))
        }
      </div>
    );
  }
}
