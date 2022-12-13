import styled from "styled-components";

interface Props {
  margin?: string;
  marginBottom?: string;
  marginTop?: string;
  fontSize?: string;
}

const Heading = styled.h1<Props>`
  margin: ${props => props.margin ?? "0px"};
  margin-bottom: ${props => props.marginBottom};
  margin-top: ${props => props.marginTop};
  font-size: ${props => props.fontSize ?? "1.5rem"};
  max-width: 400px;
  text-align: center;
  line-height: 2rem;
`;

export default Heading;
