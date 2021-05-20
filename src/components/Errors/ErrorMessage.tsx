import { Button } from "@chakra-ui/button";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <Flex
      direction="column"
      height="50vh"
      color="red.600"
      justifyContent="center"
      alignItems="center"
    >
      <WarningTwoIcon my="5" textAlign="center" fontSize="2rem" />
      <Text fontSize="1rem">{message}</Text>
      <Button
        variant="outline"
        colorScheme="red"
        as="a"
        my="5"
        href="mailto:support@mudrex.com"
      >
        Contact Support
      </Button>
    </Flex>
  );
}
