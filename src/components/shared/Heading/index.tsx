import styled from "styled-components";

interface Props {
  margin?: string;
  marginBottom?: string;
  marginTop?: string;
}

const Heading = styled.h1<Props>`
  margin: ${props => props.margin ?? "0px"};
  margin-bottom: ${props => props.marginBottom};
  margin-top: ${props => props.marginTop};
  max-width: 400px;
  text-align: center;
  line-height: 35px;
`;

export default Heading;
