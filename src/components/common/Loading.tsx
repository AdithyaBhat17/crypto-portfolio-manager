import { Flex } from "@chakra-ui/layout";
import { Player } from "@lottiefiles/react-lottie-player";

function Loading() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      height={{ base: "80vh", md: "50vh" }}
    >
      <Player
        style={{ width: "250px", height: "250px" }}
        autoplay
        loop
        src="https://assets4.lottiefiles.com/private_files/lf30_jspeqlsz.json"
      />
    </Flex>
  );
}

export default Loading;
