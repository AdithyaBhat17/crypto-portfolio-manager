import { IconButton } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/layout";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useCurrency } from "../context/exchange";
import { SUPPORTED_CURRENCIES } from "../lib/currency";
import { fetcher } from "../lib/fetcher";
import { CryptoListLatest } from "../types/api";
import ErrorMessage from "./ErrorMessage";
import Summary from "./Summary";

function TopCurrencies() {
  const [update, setUpdate] = useState<number | null>(null);

  const { currency: userCurrency } = useCurrency();

  const [holdings, setHoldings] = useState<{ [key: string]: string } | null>(
    () => {
      const persistedHoldings = localStorage.getItem("holdings");
      if (!persistedHoldings) return null;
      return JSON.parse(persistedHoldings);
    }
  );

  useEffect(() => {
    localStorage.setItem("holdings", JSON.stringify(holdings));
  }, [holdings, update]);

  const { data: list, error } = useSWR<CryptoListLatest>(
    "/cryptocurrency/listings/latest",
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
    }
  );

  const updateHolding = async (id: number, units: number) => {
    if (!id) return;
    const currentHoldings = holdings;
    let updatedHoldings = { ...currentHoldings };
    list?.data.forEach((c) => {
      if (c.id === id) {
        if (units === 0) {
          delete updatedHoldings[id.toString()];
        } else {
          updatedHoldings[id.toString(10)] = units.toString(10);
        }
      }
    });
    setHoldings(updatedHoldings);
    setUpdate(null);
  };

  if (error || (list && !list.data)) {
    return (
      <ErrorMessage message="Failed to fetch today's top 100 cryptocurrencies" />
    );
  }

  if (!list) return null;

  return (
    <>
      {holdings &&
      Object.keys(holdings).filter((h) => holdings[h] !== "0").length ? (
        <Summary holdings={holdings} currencies={list.data} />
      ) : null}
      <Box
        px="5"
        py="5"
        mb="10"
        mt="10"
        border="1px solid"
        borderColor="grey"
        borderRadius="2xl"
        overflowX="auto"
      >
        <Table size="lg" variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">#</Th>
              <Th>Name</Th>
              <Th>Symbol</Th>
              <Th isNumeric>Price ({userCurrency})</Th>
              <Th isNumeric>Circulating Supply</Th>
              <Th isNumeric>Your holdings</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list?.data?.map((currency) => (
              <Tr _hover={{ bgColor: "#f2f2f2" }} key={currency.id}>
                <Td textAlign="center">{currency.cmc_rank || "-"}</Td>
                <Td fontWeight="semibold">{currency.name}</Td>
                <Td>{currency.symbol}</Td>
                <Td isNumeric>
                  {SUPPORTED_CURRENCIES[userCurrency].symbol}
                  {(
                    currency.quote.USD.price *
                    SUPPORTED_CURRENCIES[userCurrency].rate
                  ).toLocaleString()}
                </Td>
                <Td isNumeric>
                  {currency.circulating_supply.toLocaleString()}
                </Td>
                {update === currency.id ? (
                  <Td isNumeric>
                    <NumberInput
                      bg="white"
                      float="right"
                      mr="0"
                      maxW="5rem"
                      size="xs"
                      defaultValue={holdings?.[currency.id] || ""}
                      min={0}
                      onBlur={(e) =>
                        updateHolding(currency.id, Number(e.target.value))
                      }
                    >
                      <NumberInputField autoFocus />
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
                      onClick={() => setUpdate(currency.id)}
                      alignItems="center"
                    >
                      <span>{holdings?.[currency.id] ?? "-"}</span>

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
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default TopCurrencies;
