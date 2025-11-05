// App.jsx

// Swiper CSS (v12+)
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Tailwind & Boxicons
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./index.css";

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import * as Config from "./constants/Config";

function App() {
  return (
    <BrowserRouter>
      {/* Header always visible */}
      <Header />

      {/* Routes */}
      <Routes>
        {/* Home Page */}
        <Route path={`/${Config.HOME_PAGE}`} element={<Home />} />

        {/* Catalog with optional search */}
        <Route path={`/${Config.HOME_PAGE}/:category`} element={<Catalog />} />
        <Route
          path={`/${Config.HOME_PAGE}/:category/search/:keyword`}
          element={<Catalog />}
        />

        {/* Detail Page */}
        <Route path={`/${Config.HOME_PAGE}/:category/:id`} element={<Detail />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
