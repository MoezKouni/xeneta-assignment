import styled from "styled-components";

interface Props {
    direction?: string;
    align?: string;
    justify?: string;
    padding?: string;
    background?: string;
    rounded?: boolean;
}

const Stack = styled.div<Props>`
  display: flex;
  flex-direction: ${(props: Props) => props.direction};
  align-items: ${(props: Props) => props.align};
  justify-content: ${(props: Props) => props.justify};
  padding: ${(props: Props) => props.padding};
  background: ${(props: Props) => props.background};
  border-radius: ${(props: Props) => props.rounded ? "20px" : "0px"}
`

export default Stack