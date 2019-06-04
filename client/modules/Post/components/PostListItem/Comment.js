import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 10px;
  padding: 0 15px;
  background: #edf6f7;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 12px;
  width: 5vw;
  height: 20px;
  border-radius: 10px;
  background: #e1f7fa;
  outline: none;
  margin-top: 10px;
`;

function Comment(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState("");
  useEffect(() => {
    setEditText(props.text);
  }, [props.text]);

  const testFunction = e => {
    props.updateComment(props.id, editText);
    setEditText("");
    setShowEdit(!showEdit);
    e.preventDefault;
  };
  return (
    <Wrapper>
      <h3>{props.name}</h3>
      {!showEdit ? (
        <p>{props.text}</p>
      ) : (
        <form onSubmit={e => testFunction(e)}>
          <input value={editText} onChange={e => setEditText(e.target.value)} />
        </form>
      )}

      <Button onClick={() => props.deleteComment(props.id)}>Delete</Button>
      <Button onClick={() => setShowEdit(!showEdit)}>Edit</Button>
    </Wrapper>
  );
}

export default Comment;
