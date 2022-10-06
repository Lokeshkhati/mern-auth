import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import RequiresAuth from "./components/RequiresAuth";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WishList from "./pages/WishList";
import ProductListing from "./pages/ProductListing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasssword from "./pages/ResetPasssword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="cart"
            element={
              <RequiresAuth>
                <Cart />
              </RequiresAuth>
            }
          />
          <Route
            path="wishlist"
            element={
              <RequiresAuth>
                <WishList />
              </RequiresAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequiresAuth>
                <Profile />
              </RequiresAuth>
            }
          />
          <Route path="products" element={<ProductListing />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="resetpassword/:id" element={<ResetPasssword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
