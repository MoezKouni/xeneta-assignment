import Heading from "../Heading";
import Stack from "../Stack";

export default function Warning({ text = "" }: { text?: string }) {
  return (
    <Stack direction="column" align="center" justify="center">
      <span role="img" aria-label="warning" style={{ fontSize: "3rem" }}>
        ⚠️
      </span>
      <Heading>{text}</Heading>
    </Stack>
  );
}
