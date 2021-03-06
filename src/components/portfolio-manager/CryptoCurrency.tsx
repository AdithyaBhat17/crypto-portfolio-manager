import { IconButton } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Td, Tr } from "@chakra-ui/table";
import { memo, useCallback, useRef } from "react";
import { useCurrency } from "../../context/exchange";
import { SUPPORTED_CURRENCIES } from "../../lib/exchangeRates";
import { CryptoListLatest } from "../../types/api";

interface Props {
  currency: CryptoListLatest["data"][number];
  editMode: boolean;
  setUpdateId: React.Dispatch<React.SetStateAction<number | null>>;
  holding?: string | null;
  setHoldings: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string;
    } | null>
  >;
}

function TopCurrencies({
  currency,
  editMode,
  setUpdateId,
  holding,
  setHoldings,
}: Props) {
  // exchange rate
  const { currency: userCurrency } = useCurrency();

  // To avoid each row from re-rendering every time a row has been updated,
  // store the holding that needs to be updated in the ref.
  const holdingRef = useRef(holding);

  const updateHoldings = useCallback(
    async (id: number, units: number) => {
      if (!id) return;

      if (units === 0) holdingRef.current = null;
      else holdingRef.current = Math.abs(units).toString();
      setHoldings((currentHoldings) => ({
        ...currentHoldings,
        [id]: holdingRef.current,
      }));
      setUpdateId(null);
    },
    [setHoldings, setUpdateId]
  );

  return (
    <Tr my="0" bgColor="white" _hover={{ bgColor: "#f2f2f2" }}>
      <Td textAlign="center">{currency.cmc_rank || "-"}</Td>
      <Td
        position="sticky"
        left="0"
        bgColor="inherit"
        _hover={{ bgColor: "inherit" }}
        whiteSpace="initial"
        zIndex="sticky"
        fontWeight="semibold"
      >
        {currency.name}
      </Td>
      <Td>{currency.symbol}</Td>
      <Td isNumeric>
        {SUPPORTED_CURRENCIES[userCurrency].symbol}
        {(
          currency.quote.USD.price * SUPPORTED_CURRENCIES[userCurrency].rate
        ).toLocaleString()}
      </Td>
      <Td isNumeric>{currency.circulating_supply.toLocaleString()}</Td>
      {editMode ? (
        <Td isNumeric>
          <NumberInput
            bg="white"
            float="right"
            mr="0"
            maxW="5rem"
            size="xs"
            defaultValue={holding || ""}
            min={0}
            onBlur={(e) => updateHoldings(currency.id, Number(e.target.value))}
          >
            <NumberInputField
              autoFocus
              onKeyDown={(e) =>
                e.key === "Enter" &&
                updateHoldings(
                  currency.id,
                  Number((e.target as EventTarget & { value: string }).value)
                )
              }
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Td>
      ) : (
        <Td isNumeric>
          <Flex
            as="span"
            justifyContent="flex-end"
            onClick={() => setUpdateId(currency.id)}
            alignItems="center"
          >
            <span>{holding || "-"}</span>

            <IconButton
              size="sm"
              colorScheme="purple"
              variant="link"
              aria-label="Update holdings"
              icon={<EditIcon />}
            />
          </Flex>
        </Td>
      )}
    </Tr>
  );
}

export default memo(TopCurrencies);
