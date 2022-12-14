import earthIcon from "../../../assets/earth.svg";
import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border-color: #d3d3d3;
  cursor: pointer;
  padding-right: 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: white;
  background-image: url(${earthIcon});
  background-repeat: no-repeat;
  background-position-x: 96%;
  background-position-y: 8px;
  transition: all 0.175s ease-in-out;

  &:focus {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    outline: none;
  }
  &:hover {
    background: #f4f4f4;
    border-color: #f4f4f4;
    background-image: url(${earthIcon});
    background-repeat: no-repeat;
    background-position-x: 96%;
    background-position-y: 8px;
  }
`;

export default StyledSelect;
