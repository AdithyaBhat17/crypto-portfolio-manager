import { Box } from "@chakra-ui/layout";
import { Table, Tbody, Thead } from "@chakra-ui/table";
import { memo, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import { CryptoListLatest } from "../../types/api";
import ErrorMessage from "../errors/ErrorMessage";
import Summary from "../summary";
import ColumnHeadings from "./ColumnHeadings";
import CryptoCurrency from "./CryptoCurrency";

function TopCurrencies() {
  const [updateId, setUpdateId] = useState<number | null>(null);

  const [holdings, setHoldings] = useState<{ [key: string]: string } | null>(
    () => {
      const persistedHoldings = localStorage.getItem("holdings");
      if (!persistedHoldings) return null;
      return JSON.parse(persistedHoldings);
    }
  );

  useEffect(() => {
    localStorage.setItem("holdings", JSON.stringify(holdings));
  }, [holdings, updateId]);

  const { data: list, error } = useSWR<CryptoListLatest>("/latest", fetcher, {
    suspense: true,
    revalidateOnFocus: false,
  });

  if (error || (list && !list.data)) {
    return (
      <ErrorMessage message="Failed to fetch today's top 100 cryptocurrencies" />
    );
  }

  if (!list) return null;

  return (
    <>
      {holdings && Object.values(holdings).filter(Boolean).length ? (
        <Summary holdings={holdings} currencies={list.data} />
      ) : null}
      <Box
        mb="10"
        zIndex="auto"
        mt="10"
        border="1px solid"
        borderColor="grey"
        borderRadius="2xl"
        overflowX="auto"
      >
        <Table size="lg" variant="simple">
          <Thead>
            <ColumnHeadings />
          </Thead>
          <Tbody>
            {list?.data?.map((currency) => (
              <CryptoCurrency
                key={currency.id}
                editMode={updateId === currency.id}
                setUpdateId={setUpdateId}
                currency={currency}
                // holdings={holdings}
                holding={holdings?.[currency.id] || null}
                setHoldings={setHoldings}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}

export default memo(TopCurrencies);
