import { InfoIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Th, Tr } from "@chakra-ui/table";
import { Tooltip, TooltipProps } from "@chakra-ui/tooltip";
import { memo } from "react";
import { useCurrency } from "../../context/exchange";

function ColumnHeadings() {
  const { currency } = useCurrency();

  return (
    <Tr>
      <Th textAlign="center">#</Th>
      <Th position="sticky" zIndex="sticky" bg="white" left="0">
        Name
      </Th>
      <Th>Symbol</Th>
      <Th isNumeric>Price ({currency})</Th>
      <Th isNumeric>
        <HeadingWithTooltip
          placement="bottom"
          title="Circulating supply"
          label="Approximate number of coins currently in circulation"
        />
      </Th>
      <Th isNumeric>
        <HeadingWithTooltip
          placement="bottom-end"
          title="Your holdings"
          label="The number of coins in your portfolio"
        />
      </Th>
    </Tr>
  );
}

interface Props {
  title: string;
  label: string;
  placement: TooltipProps["placement"];
}

function HeadingWithTooltip({ title, label, placement }: Props) {
  const [isHoverEnabled] = useMediaQuery("(min-width:1024px)");

  return (
    <Flex justifyContent="flex-end" alignItems="center">
      <Text isTruncated as="span" mr="2">
        {title}
      </Text>{" "}
      {isHoverEnabled ? (
        <Tooltip
          hasArrow
          placement={placement}
          label={label}
          bg="white"
          border="1px solid"
          borderColor="grey"
          shadow="none"
          borderRadius="md"
          color="black"
          p="5"
        >
          <InfoIcon color="gray.400" />
        </Tooltip>
      ) : null}
    </Flex>
  );
}

export default memo(ColumnHeadings);
