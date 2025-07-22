import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import { DestinationContext } from "./store/appStore";
import { DestinationSearchProvider } from "./store/providers";
import type { DestinationType } from "./utils/types";
import Footer from "./components/Footer/Footer";
import Destination from "./pages/Destination/Destination";
import Destinations from "./pages/Destinations/Destinations";
import Contact from "./pages/Contact/Contact";

function App() {
  const [products, setProducts] = useState<DestinationType[] | null>([]);

  useEffect(() => {
    fetch("/MOCK_DATA.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <Header />
      <main className="main">
        <DestinationSearchProvider>
          <DestinationContext.Provider value={products || []}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destination/:id" element={<Destination />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<h1 className="not-found">404</h1>} />
            </Routes>
          </DestinationContext.Provider>
        </DestinationSearchProvider>
      </main>
      <Footer />
    </>
  );
}

export default App;
