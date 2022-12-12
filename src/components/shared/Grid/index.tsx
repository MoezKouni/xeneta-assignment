import styled from "styled-components"

interface Props {
    gridTemplateColumns?: string;
    gap?: string;
}

const Grid = styled.div<Props>`
    display: grid;
    grid-template-columns: ${props => props.gridTemplateColumns};
    gap: ${props => props.gap}
`

export default Grid