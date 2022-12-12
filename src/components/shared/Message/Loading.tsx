import Heading from "../Heading";
import Spinner from "../Spinner";
import Stack from "../Stack";

export default function Loading() {
  return (
    <Stack direction="column" align="center" justify="center">
      <Spinner />
      <Heading>Loading...</Heading>
    </Stack>
  );
}
