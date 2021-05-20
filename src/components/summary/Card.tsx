import { memo } from "react";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

interface Props {
  title: string;
  value: string | number;
}

function SummaryCard({ title, value }: Props) {
  return (
    <Box
      pl="5"
      w={{ base: "100%", md: "auto" }}
      pr="10"
      py="5"
      border="1px solid"
      borderColor="grey"
      borderRadius="xl"
    >
      <Stack>
        <Text isTruncated>{title}</Text>
        <Heading isTruncated color="purple" size="md">
          {value}
        </Heading>
      </Stack>
    </Box>
  );
}

export default memo(SummaryCard);
