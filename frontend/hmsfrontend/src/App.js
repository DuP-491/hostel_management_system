import { Routes, Route } from "react-router";
import HomePage from "./pages/Home/HomePage";
import ItemPage from "./pages/Item/ItemPage";
import StockPage from "./pages/Stock/StockPage";
import StockDetailPage from "./pages/Stock/StockDetailPage";

const App = (props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item" element={<ItemPage />} />
      <Route path="/stock" element={<StockPage />} />
      <Route path="/stock/:itemid" element={<StockDetailPage/>} />
    </Routes>
  );
};

export default App;
