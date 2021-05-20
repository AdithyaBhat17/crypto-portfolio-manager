import { Flex, Grid, Heading } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import { memo, useMemo } from "react";
import { useCurrency } from "../../context/exchange";
import { SUPPORTED_CURRENCIES } from "../../lib/exchangeRates";
import { CryptoListLatest } from "../../types/api";
import SummaryCard from "./Card";

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
          <SummaryCard
            title="Portfolio Value"
            value={SUPPORTED_CURRENCIES[currency].symbol + totalPortfolioValue}
          />
          <SummaryCard
            title="Cryptos Invested"
            value={
              Object.keys(holdings).filter((h) => holdings[h] !== "0").length
            }
          />
          <SummaryCard
            title="Market Cap"
            value={SUPPORTED_CURRENCIES[currency].symbol + marketCap}
          />
        </Grid>
      </Flex>
    </Collapse>
  );
}

export default memo(Summary);
