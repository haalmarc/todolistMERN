import NewTodo from "./components/NewTodo";
import TodoDisplay from "./components/TodoDisplay";
import "./App.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { deleteTodo, getData, postNewTodo } from "./utils/API";

const Wrapper = styled.div`
  margin: 2em;
  padding: 1.5em;
  background-color: burlywood;
  border-radius: 12px;
`;

const Title = styled.h2`
  font-family: "Lucida Handwriting";
`;

function App() {
  const [todos, setTodos] = useState([]);

  async function fetchAPI() {
    let response = await getData();
    setTodos(response);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  function handleDelete(id) {
    deleteTodo(id);
    fetchAPI();
  }

  const handleSubmit = (text) => {
    postNewTodo(text);
    fetchAPI();
  };

  return (
    <Wrapper>
      <Title>Hva er dagens plan?</Title>
      <TodoDisplay todos={todos} handleDelete={handleDelete} />
      <NewTodo handleSubmit={handleSubmit} />
    </Wrapper>
  );
}

export default App;
