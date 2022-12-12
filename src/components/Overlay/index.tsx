import { useCallback } from "react";
import styled from "styled-components";
import Error from "../Message/Error";
import Loading from "../Message/Loading";
import Warning from "../Message/Warning";

interface Props {
  isError: boolean;
  isInitial: boolean;
  isLoading: boolean;
  noLineSelected: boolean;
}

export default function ({
  isError,
  isInitial,
  isLoading,
  noLineSelected,
}: Props) {
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
  }, [isError, isInitial, isLoading]);

  return <Overlay>{message()}</Overlay>;
}

const Overlay = styled.div`
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