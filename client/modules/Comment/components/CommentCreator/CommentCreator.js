import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './CommentCreator.css';

function CommentCreator(props) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const addComment = () => {
    props.handleAdd(props.post, name, text);
    setName('');
    setText('');
  };
  return (
    <div className={`${styles['creator-container']}`}>
      <h4>What do you think about it? Let's text</h4>
      <div className={`${styles['input-area']}`}>
        <input
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <textarea
          placeholder="Message"
          onChange={e => setText(e.target.value)}
          value={text}
        />
      </div>
      <button
        className={`${styles['btn-send']}`}
        onClick={() => addComment()}
      >
      Send
      </button>
    </div>
  );
}

CommentCreator.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  post: PropTypes.string.isRequired,
};

export default CommentCreator;
