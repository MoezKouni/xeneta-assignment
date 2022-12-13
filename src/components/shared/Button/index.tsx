import styled from "styled-components";

const Button = styled.button`
  background: white;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  margin: 5px 0px;
  display: inline-flex;
  padding: 8px;
  align-items: center;
  cursor: pointer;
  align-self: center;
  transition: background 0.12s ease-in-out;

  &:hover {
    background: #f4f4f4;
    border-color: #f4f4f4;
  }
`;

export default Button;
