import expect from 'expect';
import { take, call, put } from 'redux-saga/effects';
import { ADD_POST_REQUEST, DELETE_POST_REQUEST, FETCH_POSTS, FETCH_POST } from '../redux/constants/constants';
import { baseURL, addPost, deletePost, addPosts, addSelectedPost } from '../redux/actions/actions';
import { addPostSaga, deletePostSaga, sendRequest, fetchPostsSaga, fetchPostSaga } from '../redux/sagas/postsSaga';

describe('sagas tests', () => {
  it('adds post when a delete post request succeeds', () => {
    const generator = addPostSaga();
    const request = {
      post: {
        name: 'mern',
        title: 'some post',
        content: 'some content',
      },
    };
    const response = {
      data: {
        post: {
          __v: 0,
          cuid: 'cim6oqo4o0005ti8zcrwh5t7i',
          slug: 'some-post',
          name: 'mern',
          title: 'some post',
          content: 'some content',
          _id: '56f44304bd489b16509f4126',
          dateAdded: '2016-03-24T19:41:56.991Z',
        },
      },
    };

    expect(generator.next().value).toEqual(take(ADD_POST_REQUEST));

    expect(generator.next(request).value)
      .toEqual(call(sendRequest, `${baseURL}/api/addPost`, {
        method: 'post',
        body: JSON.stringify({
          post: {
            name: request.post.name,
            title: request.post.title,
            content: request.post.content,
          },
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }));

    expect(generator.next(response).value).toEqual(put(addPost(response.data.post)));
  });

  it('deletes post when a delete post request succeeds', () => {
    const generator = deletePostSaga();
    const request = {
      post: {
        _id: '56f44304bd489b16509f4126',
      },
    };

    expect(generator.next().value).toEqual(take(DELETE_POST_REQUEST));

    expect(generator.next(request).value)
      .toEqual(call(sendRequest, `${baseURL}/api/deletePost`, {
        method: 'post',
        body: JSON.stringify({
          postId: request.post._id,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }));

    expect(generator.next({}).value).toEqual(put(deletePost(request.post)));
  });

  it('adds posts when a fetch posts request succeeds', () => {
    const generator = fetchPostsSaga();
    const response = {
      data: {
        posts: [
          {
            __v: 0,
            cuid: 'cim6oqo4o0005ti8zcrwh5t7i',
            slug: 'some-post',
            name: 'mern',
            title: 'some post',
            content: 'some content',
            _id: '56f44304bd489b16509f4126',
            dateAdded: '2016-03-24T19:41:56.991Z',
          },
        ],
      },
    };

    expect(generator.next().value).toEqual(take(FETCH_POSTS));

    expect(generator.next().value)
      .toEqual(call(sendRequest, `${baseURL}/api/getPosts`));

    expect(generator.next(response).value).toEqual(put(addPosts(response.data.posts)));
  });

  it('adds post when a fetch single post request succeeds', () => {
    const generator = fetchPostSaga();
    const request = {
      post: {
        __v: 0,
        cuid: 'cim6oqo4o0005ti8zcrwh5t7i',
        slug: 'some-post',
        name: 'mern',
        title: 'some post',
        content: 'some content',
        _id: '56f44304bd489b16509f4126',
        dateAdded: '2016-03-24T19:41:56.991Z',
      },
    };
    const response = {
      data: {
        post: {
          __v: 0,
          cuid: 'cim6oqo4o0005ti8zcrwh5t7i',
          slug: 'some-post',
          name: 'mern',
          title: 'some post',
          content: 'some content',
          _id: '56f44304bd489b16509f4126',
          dateAdded: '2016-03-24T19:41:56.991Z',
        },
      },
    };

    expect(generator.next().value).toEqual(take(FETCH_POST));

    expect(generator.next(request).value)
      .toEqual(call(sendRequest, `${baseURL}/api/getPost?slug=${request.post.slug}-${request.post.cuid}`, {
        method: 'get',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }));

    expect(generator.next(response).value).toEqual(put(addSelectedPost(response.data.post)));
  });
});
