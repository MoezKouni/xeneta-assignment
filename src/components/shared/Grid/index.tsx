import styled from "styled-components";

interface Props {
  gridTemplateColumns?: {
    base: string;
    lg: string;
  };
  gap?: string;
}

const Grid = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns?.lg};
  gap: ${(props) => props.gap};

  @media (max-width: 1200px) {
    grid-template-columns: ${(props) => props.gridTemplateColumns?.base};
  }
`;

export default Grid;
