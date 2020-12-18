import styled from "styled-components";

const Wrapper = styled.ul`
  padding: 0;

  li {
    list-style: none;
    margin-bottom: 0.4em;
    border-bottom: 1px solid firebrick;
  }

  li > span {
    margin-right: 0.5em;
    color: firebrick;
    cursor: pointer;
  }
`;

export default function TodoDisplay({ todos, handleDelete }) {
  return (
    <Wrapper>
      {todos.map((item) => {
        return (
          <li key={item._id}>
            <span onClick={() => handleDelete(item._id)}>X</span>
            {item.name}
          </li>
        );
      })}
    </Wrapper>
  );
}
