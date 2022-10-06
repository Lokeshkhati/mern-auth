import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";
const Home = () => {
  const { setUser } = useAuth();
 
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">Home Page</h1>
    </div>
  );
};

export default Home;
