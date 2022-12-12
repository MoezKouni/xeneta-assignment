import { ReactElement } from 'react';
import styled from "styled-components";

interface Props {
    direction?: string;
    align?: string;
    justify?: string;
}

const Stack = styled.div<Props>`
  display: flex;
  flex-direction: ${(props: Props) => props.direction};
  align-items: ${(props: Props) => props.align};;
  justify-content: ${(props: Props) => props.justify};;
`

export default Stack