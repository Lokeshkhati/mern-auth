import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type AuthProviderPropType = {
  children: React.ReactNode;
};
type AuthContextType = {
  isAuthenticated: string | null;
  // isLoggedIn: boolean;

  user: {
    firstName: string;
    lastName: string;
  };
  // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      lastName: string;
    }>
  >;
  handleLogout: () => void;
};
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuth = () => useContext(AuthContext);
const initialState = {
  firstName: "",
  lastName: "",
};

const AuthProvider = ({ children }: AuthProviderPropType) => {
  const isAuthenticated = localStorage.getItem("token");
  const [user, setUser] = useState(initialState);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    toast.success("Logged out Successfully", {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    window.location.reload();
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      const { firstName, lastName } = userData;
      setUser({ firstName, lastName });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
