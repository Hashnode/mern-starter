import React from 'react';
import styles from './CommentLists.css';

const CommentLists = (props) => {
  const { elem, index, click, indexNum, isOpen } = props;

  return (
            <div className={styles['list']}>
                    <ul>
                        <li>
                            <span>Name : </span><h3>{elem.name}</h3><br />
                        </li>
{/*                        <li>
                            <span>Title :</span><h3>{elem.title}</h3><br/>
                        </li>*/}
                        <li>
                            <span>Comment </span> <br />{elem.comment} <br />
                        </li>
                    </ul>
                    {isOpen && <button
                      className={styles['list-button']}
                      onClick={() => { props.removeComment(index); }}
                    >
                        Delete comment
                    </button >}
                    {isOpen && click && <button
                      className={styles['list-button']}
                      onClick={() => props.editComment(index)}
                    >
                        Edit comment
                    </button>}
                    {isOpen && !click && index === indexNum && <button
                      onClick={() => props.saveComment(index)}
                      className={styles['list-button']}
                    >
                        Save
                    </button>}
                </div>
    );
};


export default CommentLists;
