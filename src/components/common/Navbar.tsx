import { Flex, Heading, HStack, List, ListItem } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { Select } from "@chakra-ui/select";
import { ChangeEvent } from "react";
import { useCurrency } from "../../context/exchange";
import { SUPPORTED_CURRENCIES, Currency } from "../../lib/exchangeRates";

function Navbar() {
  const { currency, setCurrency } = useCurrency();

  const [isMobileScreen] = useMediaQuery("(max-width:500px)");

  const updateCurrency = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrency((event.target as EventTarget & { value: Currency }).value);
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      justifyContent="space-between"
      py={{ base: 5, sm: 10 }}
    >
      <Heading color="purple">Mudrex </Heading>
      <List display="flex" justifyContent="flex-end">
        <HStack spacing={{ base: "1rem", sm: "2rem" }}>
          <ListItem hidden={isMobileScreen}>
            <a
              href="http://mudrex.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </ListItem>
          <ListItem hidden={isMobileScreen}>
            <a href="mailto:support@mudrex.com">Contact</a>
          </ListItem>
          <ListItem>
            <Select
              aria-label="exchange-currency"
              cursor="pointer"
              onChange={updateCurrency}
              variant="filled"
              p={{ base: "0", sm: "auto" }}
              defaultValue={currency}
            >
              {Object.keys(SUPPORTED_CURRENCIES).map((currency) => (
                <option key={currency} value={currency}>
                  {SUPPORTED_CURRENCIES[currency as Currency].symbol} {currency}
                </option>
              ))}
            </Select>
          </ListItem>
        </HStack>
      </List>
    </Flex>
  );
}

export default Navbar;
