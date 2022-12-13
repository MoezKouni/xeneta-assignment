import styled from "styled-components";

interface Props {
  gridTemplateColumns?: {
    base: string;
    md: string;
  };
  gap?: string;
}

const Grid = styled.div<Props>`
  display: grid;
  grid-template-columns: ${(props) => props.gridTemplateColumns?.md};
  gap: ${(props) => props.gap};

  @media (max-width: 768px) {
    grid-template-columns: ${(props) => props.gridTemplateColumns?.base};
  }
`;

export default Grid;
