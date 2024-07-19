import { Route, Routes } from "react-router-dom";
import Template from "./pages/_TemplatePage";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HistoryPage from "./pages/HistoryPage";
import FavouritePage from "./pages/FavouritePage"
import CartPage from "./pages/CartPage"
import ViewItemDetailPage from "./pages/ViewItemDetailPage";
import UserProfilePage from "./pages/UserProfilePage";


function App() {
  return (
      <Routes >
        <Route path="/" element={<Template />} >
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="item" element={<ViewItemDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="profile">
            <Route index element={<UserProfilePage />} />
            <Route path="favourite" element={<FavouritePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="cart" element={<CartPage />} /> 
          </Route> 
        </Route>        
      </Routes>
  );
}

export default App;
