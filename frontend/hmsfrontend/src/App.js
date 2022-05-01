import { Routes, Route } from "react-router";

import HomePage from "./pages/Home/HomePage";
import ItemPage from "./pages/Item/ItemPage";
import StockPage from "./pages/Stock/StockPage";
import PageNotFound from "./pages/Error/PageNotFound";
import StockDetailPage from "./pages/Stock/StockDetailPage";
import DemandPage from "./pages/Demand/DemandPage";
import DemandItemPage from "./pages/Demand/DemandItemPage";

const App = (props) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item" element={<ItemPage />} />
      <Route path="/stock" element={<StockPage />} />
      <Route path="/stock/:itemid" element={<StockDetailPage />} />
      <Route path="/demand" element={<DemandPage />} />
      <Route path="/demand/:demandId" element={<DemandItemPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
