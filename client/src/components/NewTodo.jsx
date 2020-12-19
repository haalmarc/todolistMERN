import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin-top: 0.5em;
  display: inline;
  border-radius: 0 3px 3px 0;
  padding: 0.2 0.5em;
  background: firebrick;
  color: white;
  border: 2px solid firebrick;
`;

export default function NewTodo({ handleSubmit }) {
  const [text, setText] = useState("");

  function submitText() {
    if (text.length > 0) {
      handleSubmit(text);
      setText("");
    }
  }

  return (
    <form>
      <input
        type="text"
        name="todoName"
        placeholder="Skriv her ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type="button" onClick={submitText}>
        +
      </Button>
    </form>
  );
}
