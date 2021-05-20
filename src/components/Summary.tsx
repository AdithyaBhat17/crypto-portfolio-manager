import {
  Box,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { useMemo } from "react";
import { useCurrency } from "../context/exchange";
import { SUPPORTED_CURRENCIES } from "../lib/currency";
import { CryptoListLatest } from "../types/api";

interface Props {
  holdings: {
    [key: string]: string;
  };
  currencies: CryptoListLatest["data"];
}

function Summary({ holdings, currencies }: Props) {
  const { currency } = useCurrency();

  const totalPortfolioValue = useMemo(() => {
    return currencies
      .reduce((total, current) => {
        return (
          total +
          current.quote.USD.price *
            (Number(holdings[current.id]) || 0) *
            SUPPORTED_CURRENCIES[currency].rate
        );
      }, 0)
      .toLocaleString();
  }, [currencies, currency, holdings]);

  const marketCap = useMemo(() => {
    return (
      (
        currencies.reduce((total, current) => {
          return (
            total +
            current.quote.USD.price *
              SUPPORTED_CURRENCIES[currency].rate *
              current.circulating_supply
          );
        }, 0) / 1e12
      ) // Divide the total market cap by 1 Trillion
        .toFixed(2) + "T"
    );
  }, [currencies, currency]);

  return (
    <Collapse in={true} animateOpacity>
      <Flex wrap="wrap" justifyContent="space-between" alignItems="center">
        <Heading size="lg" my={{ base: "5", lg: "0" }}>
          Top 100 Cryptocurrencies
        </Heading>
        <Grid
          overflowX="auto"
          gridGap="5"
          width={{ base: "100%", md: "auto" }}
          gridTemplateColumns="repeat(3, 1fr)"
        >
          {/* <SimpleGrid
          columns={{ base: 1, sm: 3 }}
          spacing={{ base: "5", md: "10" }}
        > */}
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
              <Text>Portfolio Value</Text>
              <Heading isTruncated color="purple" size="md">
                {SUPPORTED_CURRENCIES[currency].symbol}
                {totalPortfolioValue}
              </Heading>
            </Stack>
          </Box>
          <Box
            pl="5"
            pr="10"
            py="5"
            w={{ base: "100%", md: "auto" }}
            border="1px solid"
            borderColor="grey"
            borderRadius="xl"
          >
            <Stack>
              <Text isTruncated>Cryptos Invested</Text>
              <Heading color="purple" size="md">
                {
                  Object.keys(holdings).filter((h) => holdings[h] !== "0")
                    .length
                }
              </Heading>
            </Stack>
          </Box>
          <Box
            pl="5"
            pr="10"
            py="5"
            w={{ base: "100%", md: "auto" }}
            border="1px solid"
            borderColor="grey"
            borderRadius="xl"
          >
            <Stack>
              <Text isTruncated>Market Cap (Top 100)</Text>
              <Heading color="purple" size="md">
                {SUPPORTED_CURRENCIES[currency].symbol} {marketCap}
              </Heading>
            </Stack>
          </Box>
          {/* </SimpleGrid> */}
        </Grid>
      </Flex>
    </Collapse>
  );
}

export default Summary;
