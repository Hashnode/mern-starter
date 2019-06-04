import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.input`
  margin-top: 5px;
  width: 30vw;
  font-size: 18px;
  height: 30px;
  padding: 0.5rem;
  outline: none;
  border: none;
  border-radius: 10px;
  background: #e1f7fa;
  border-bottom: 1px solid #f5feff;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 15px;
  width: 10vw;
  height: 25px;
  border-radius: 10px;
  background: #e1f7fa;
  outline: none;
  margin-top: 10px;
`;

function Input(props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  return (
    <Form
      onSubmit={e => {
        props.getComment(name, comment);
        setName("");
        setComment("");
        e.preventDefault();
      }}
    >
      <Field
        required
        placeholder="name"
        value={name}
        type="text"
        onChange={e => setName(e.target.value)}
      />

      <Field
        placeholder="comment"
        required
        value={comment}
        type="text"
        onChange={e => setComment(e.target.value)}
      />
      <Button type="submit">Add</Button>
    </Form>
  );
}

export default Input;
