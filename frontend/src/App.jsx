import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import ReadProducts from "./pages/ReadProducts";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";
import ProductCards from "./pages/ProductCards";

const App = () => {
  return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-5">
          <Routes>
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/read-products" element={<ReadProducts />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/delete-product/:id" element={<DeleteProduct />} />
            <Route path="/product-cards" element={<ProductCards />} />
          </Routes>
        </div>
      </div>
  );
};

export default App;
