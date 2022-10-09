import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { initialState, loginReducer } from "../reducers/loginReducer";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { email, password, error, isLoading } = state;

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: "login" });
    try {
      const { data } = await axios.post(
        "https://demo-server-lokesh.herokuapp.com/api/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("LogIn Successfull", {
        position: toast.POSITION.TOP_RIGHT,
      });
      const { user, token } = data;
      const { firstName, lastName } = user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser({ firstName, lastName });
      navigate("/", { replace: true });
    } catch (error: any) {
      // toast.error(error.response.data.error, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };
  return (
    <div className={`flex  justify-center items-center h-screen  `}>
      <form
        onSubmit={handleLogin}
        className=" flex flex-col p-4   w-96 border-2 rounded border-gray-200 "
      >
        <h1 className=" text-2xl font-bold text-center ">LogIn</h1>
        {error && (
          <h1 className="text-rose-500 text-lg text-center font-semibold">
            {error}
          </h1>
        )}
        <div className="text-md mt-2 text-center">
          <span className="  ">Don't have an account? </span>
          <Link
            className=" text-indigo-500 hover:underline font-semibold"
            to="/register"
          >
            Register
          </Link>
        </div>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Email</label>

          <input
            type="email"
            placeholder="johndoe@example.com"
            required
            value={email}
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "email",
                payload: event.currentTarget.value,
              });
            }}
            className="w-full mt-2  pl-4  py-2 rounded-md border-2 border-gray-300  outline-none focus:border-indigo-500"
          />
        </div>

        <div className="w-full  mt-2.5 ">
          <label className="  font-semibold  ">Password</label>

          <input
            type="password"
            placeholder="************"
            required
            value={password}
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "password",
                payload: event.currentTarget.value,
              });
            }}
            className="w-full mt-2  pl-4  py-2 rounded-md border-2 border-gray-300  outline-none  focus:border-indigo-500"
          />
        </div>

        <div className="w-full  mt-2 ">
          <button
            type="submit"
            disabled={isLoading}
            className=" w-full  mx-auto bg-indigo-500 hover:bg-indigo-600 text-white rounded-md  py-2.5 m-3 font-semibold"
          >
            {isLoading ? "Logging In . . ." : "Log In"}
          </button>
        </div>

        <div className="text-md text-right">
          <Link
            className="   text-indigo-500 hover:underline font-semibold"
            to="/forgotpassword"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
