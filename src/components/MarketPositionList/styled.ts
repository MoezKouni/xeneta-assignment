import styled from "styled-components";

interface CheckboxProps {
  isChecked: boolean;
}
export const Checkbox = styled.input<{ bg: string }>`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ span {
    background-color: ${(props) => props.bg};
  }
`;

export const CustomCheckbox = styled.span<{ bg: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: white;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  margin-right: 10px;
`;

export const Label = styled.label<CheckboxProps>`
  color: ${(props) => (props.isChecked ? "black" : "#d3d3d3")};
  margin-left: 35px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.isChecked ? "black" : "#afafaf")};
  }
`;
export const CheckboxGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
