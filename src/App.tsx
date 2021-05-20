import { Suspense } from "react";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import TopCurrencies from "./components/TopCurrencies";
import Footer from "./components/Footer";
import { CurrencyProvider } from "./context/exchange";

function App() {
  return (
    <Layout>
      <CurrencyProvider>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <TopCurrencies />
        </Suspense>
      </CurrencyProvider>
      <Footer />
    </Layout>
  );
}

export default App;
