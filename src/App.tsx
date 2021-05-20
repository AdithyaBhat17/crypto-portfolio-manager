import { Suspense } from "react";
import Layout from "./components/common/Layout";
import Loading from "./components/common/Loading";
import Navbar from "./components/common/Navbar";
import PortfolioManager from "./components/portfolio-manager";
import Footer from "./components/common/Footer";
import { CurrencyProvider } from "./context/exchange";
import ErrorBoundary from "./components/errors/ErrorBoundary";

function App() {
  return (
    <Layout>
      <CurrencyProvider>
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <PortfolioManager />
          </Suspense>
        </ErrorBoundary>
      </CurrencyProvider>
      <Footer />
    </Layout>
  );
}

export default App;
