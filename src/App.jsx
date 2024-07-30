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
import ProfilePage from "./pages/ProfilePage"
import AdminPage from "./pages/AdminPage"

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
          <Route path="admin" element={<AdminPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>        
      </Routes>
  );
}

export default App;
