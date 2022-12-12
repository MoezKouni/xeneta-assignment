import { ReactElement, useCallback } from "react";
import styled from "styled-components";
import Error from "../shared/Message/Error";
import Loading from "../shared/Message/Loading";
import Warning from "../shared/Message/Warning";

interface Props {
  isError: boolean;
  isInitial: boolean;
  isLoading: boolean;
  noLineSelected: boolean;
}

export default function Overlay ({
  isError,
  isInitial,
  isLoading,
  noLineSelected,
}: Props): ReactElement {
  const message = useCallback(() => {
    if (isLoading) {
      return <Loading />;
    } else if (isError) {
      return <Error />;
    } else if (noLineSelected) {
      return <Warning text="Please select a market position."/>;
    } else if (isInitial) {
      return <Warning text="Please select Origin and Destination Port."/>;
    }
  }, [isError, isInitial, isLoading, noLineSelected]);

  return <StyledOverlay>{message()}</StyledOverlay>;
}

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.28);
  }
`;