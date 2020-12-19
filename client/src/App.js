import NewTodo from "./components/NewTodo";
import TodoDisplay from "./components/TodoDisplay";
import "./App.css";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { deleteTodo, getData, postNewTodo } from "./utils/API";

const Wrapper = styled.div`
  padding: 0.5em 1.5em 1.5em 1.5em;
  background-color: burlywood;
  border-radius: 12px;
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
      <h2>Hva er dagens plan?</h2>
      <TodoDisplay todos={todos} handleDelete={handleDelete} />
      <NewTodo handleSubmit={handleSubmit} />
    </Wrapper>
  );
}

export default App;
