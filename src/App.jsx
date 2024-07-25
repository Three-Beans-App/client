import { Route, Routes } from "react-router-dom";
import Template from "./pages/_TemplatePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HistoryPage from "./pages/HistoryPage";
import FavouritePage from "./pages/FavouritePage"
import CartPage from "./pages/CartPage";
import AddItemPage from "./pages/AddItemPage";



function App() {
  return (
      <Routes >
        <Route path="/" element={<Template />} >
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="favourite" element={<FavouritePage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="cart" element={<CartPage />} /> 
          <Route path="addItem" element={<AddItemPage />} />   
        </Route>        
      </Routes>
  );
}

export default App;
