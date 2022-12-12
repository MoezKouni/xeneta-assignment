import Heading from '../Heading'
import Stack from '../Stack'

export default function Error() {
  return (
    <Stack direction='column' align='center' justify='center'>
        <span role="img" aria-label="pensive face" style={{ fontSize: "3rem" }}>😔</span>
        <Heading>Oops, something went wrong!</Heading>
    </Stack>
  )
}
