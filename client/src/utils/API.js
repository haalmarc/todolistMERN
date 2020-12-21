import axios from "axios";

const endpoint = "api/data"; // client is proxied to localhost:5000/

export const getData = async () => {
  const res = await axios.get(endpoint);
  return res.data;
};

export const postNewTodo = (text) => {
  axios.post(endpoint, text, { headers: { "Content-Type": "text/plain" } });
};

export const deleteTodo = (id) => {
  axios.delete(`${endpoint}/${id}`);
};
