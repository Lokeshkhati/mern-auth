import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
  const { firstName, lastName } = user;
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-center items-center text-white bg-green-500 h-12">
      <div className="flex justify-between  w-full max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">
            <Link to="/">LOGO</Link>
          </h1>
        </div>
        {isAuthenticated ? (
          <h1 className="text-2xl font-semibold text-center">
            {`Hi, ${firstName}
             ${lastName}`}
          </h1>
        ) : (
          ""
        )}
        <div className="flex gap-8 text-lg font-semibold">
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/wishlist">WishList</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/products">Products</NavLink>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>LogIn</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
