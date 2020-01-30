import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { CommentFormWidget } from '../../CommentFormWidget/CommentFormWidget';
import {
  mountWithIntl,
  shallowWithIntl,
} from '../../../../util/react-intl-test-helper';

const props = {
  initialValues: {
    author: '',
    content: '',
  },
  onClose: () => {},
  inline: false,
  addComment: () => {},
  editComment: () => {},
  submitCallback: () => {},
  params: {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <CommentFormWidget {...props} />
  );

  t.truthy(wrapper.hasClass('show-btn'));
});

test('should trigger the form appearance', t => {
  const wrapper = shallowWithIntl(
    <CommentFormWidget {...props} />
  );

  const trigger = wrapper.find('button');
  const state = wrapper.instance().state;

  t.true(!state.isFormShown);
  trigger.simulate('click');
  wrapper.setProps(props);
  t.truthy(wrapper.hasClass('container'));
});

test('should always show the form in inline mode', t => {
  const wrapper = shallowWithIntl(
    <CommentFormWidget {...props} inline />
  );

  const state = wrapper.instance().state;

  t.true(!state.isFormShown);
  t.truthy(wrapper.hasClass('container'));
});

test('should populate the form with initial values', t => {
  const initialValues = {
    author: 'John Doe',
    content: 'Jonh\'s Doe comment',
  };

  const wrapper = mountWithIntl(
    <CommentFormWidget {...props} inline initialValues={initialValues} />
  );
  wrapper.update();

  const state = wrapper.instance().state;

  const authorInput = wrapper.find('[name="author"]').instance();
  const contentInput = wrapper.find('[name="content"]').instance();

  t.deepEqual(state.comment, initialValues);
  t.true(authorInput.value === initialValues.author);
  t.true(contentInput.value === initialValues.content);
});

test('should trigger onClose prop when in `inline` mode', t => {
  const onClose = sinon.spy();
  const wrapper = mountWithIntl(
    <CommentFormWidget {...props} inline onClose={onClose} />
  );

  const closeBtn = wrapper.find('.close-btn');
  closeBtn.simulate('click');

  t.truthy(onClose.calledOnce);
});

test('should reject form submission if postId is not present in URL params', t => {
  const formData = {
    comment: {
      author: 'John Doe',
      content: 'John Doe comment',
    },
    reject: () => {},
    resolve: () => {},
  };

  const spy = sinon.spy(formData, 'reject');

  const wrapper = mountWithIntl(<CommentFormWidget params={{}} {...props} inline />);

  wrapper.instance().handleFormSubmit(formData);

  t.truthy(spy.calledWith('PostId should be specified.'));
});

test('should trigger callback function after successful form submission', t => {
  const submitCallback = sinon.spy();
  const formData = {
    comment: {
      author: 'John Doe',
      content: 'John Doe comment',
    },
    reject: () => {},
    resolve: () => {},
  };

  const wrapper = mountWithIntl(
    <CommentFormWidget
      {...props}
      params={{ cuid: 'some-fake-cuid' }}
      inline
      submitCallback={submitCallback}
    />,
    );

  wrapper.instance().handleFormSubmit(formData);

  t.truthy(submitCallback.calledOnce);
});

test('should trigger editComment prop when initialValues was suplied', t => {
  const addComment = sinon.spy();
  const editComment = sinon.spy();

  const initialValues = {
    author: 'John Doe',
    content: 'Jonh\'s Doe initial comment',
  };

  const formData = {
    comment: {
      author: 'Jane Doe',
      content: 'John Doe latest comment',
    },
    reject: () => {},
    resolve: () => {},
  };

  const wrapper = mountWithIntl(
    <CommentFormWidget
      {...props}
      params={{ cuid: 'some-fake-cuid' }}
      inline
      initialValues={initialValues}
      addComment={addComment}
      editComment={editComment}
    />,
  );

  wrapper.instance().handleFormSubmit(formData);

  t.truthy(addComment.notCalled);
  t.truthy(editComment.calledWith({ ...formData, postId: 'some-fake-cuid' }));
});

test('should trigger addComment prop when initialValues wasn\'t suplied', t => {
  const addComment = sinon.spy();
  const editComment = sinon.spy();

  const initialValues = null;

  const formData = {
    comment: {
      author: 'Jane Doe',
      content: 'John Doe latest comment',
    },
    reject: () => {},
    resolve: () => {},
  };

  const wrapper = mountWithIntl(
    <CommentFormWidget
      {...props}
      params={{ cuid: 'some-fake-cuid' }}
      inline
      initialValues={initialValues}
      addComment={addComment}
      editComment={editComment}
    />,
  );

  wrapper.instance().handleFormSubmit(formData);

  t.truthy(editComment.notCalled);
  t.truthy(addComment.calledWith({ ...formData, postId: 'some-fake-cuid' }));
});
