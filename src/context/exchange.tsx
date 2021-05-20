import {
  createContext,
  ReactChild,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Currency, getUserCurrency, setUserCurrency } from "../lib/currency";

const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: React.Dispatch<React.SetStateAction<Currency>>;
}>({
  currency: "INR",
  setCurrency: () => {},
});

export function CurrencyProvider({
  children,
}: {
  children: ReactChild | ReactChild[];
}) {
  const [currency, setCurrency] = useState<Currency>(() => {
    return getUserCurrency();
  });

  useEffect(() => {
    setUserCurrency(currency);
  }, [currency]);

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (typeof context === "undefined")
    throw new Error("Cannot use useCurrency() outside <CurrencyProvider />");

  return context;
}
