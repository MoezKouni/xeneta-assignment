import { ReactNode } from "react";

interface Props {
  condition: boolean;
  children?: ReactNode;
}

export default function When({ condition, children }: Props): JSX.Element|null {
  if (condition) {
    return <>{children}</>;
  }
  return null;
}
