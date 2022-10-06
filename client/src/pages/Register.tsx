import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
import { initialState, registerReducer } from "../reducers/registerReducer";

const Register = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState);
  const { firstName, lastName, email, password, error, isLoading } = state;

  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch({ type: "register" });

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/register",
        userData,
        {
          headers: {
           "Content-Type": "application/json",
          },
        }
      );
      navigate("/login", { replace: true });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <div
      className={`flex  justify-center items-center h-screen  
        `}
    >
      <form
        onSubmit={handleRegister}
        className=" flex flex-col p-4  items-center w-96 border-2 border-gray-200 rounded "
      >
        <h1 className="text-2xl font-bold ">Sign UP</h1>
        {/* {error && (
          <h1 className="text-rose-500 text-lg font-semibold">{error} </h1>
        )} */}

        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">FirstName</label>

          <input
            value={firstName}
            onChange={(event) => {
              dispatch({
                type: "field",
                fieldName: "firstName",
                payload: event.currentTarget.value,
              });
            }}
            type="text"
            className="w-full mt-2  pl-4  py-2 rounded-md border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="john"
          />
        </div>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">LastName</label>

          <input
            value={lastName}
            onChange={(event) =>
              dispatch({
                type: "field",
                fieldName: "lastName",
                payload: event.currentTarget.value,
              })
            }
            required
            type="text"
            className="w-full mt-2  pl-4  py-2 rounded-md border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="doe"
          />
        </div>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Email</label>

          <input
            value={email}
            onChange={(event) =>
              dispatch({
                type: "field",
                fieldName: "email",
                payload: event.currentTarget.value,
              })
            }
            required
            type="email"
            className="w-full mt-2  pl-4  py-2 rounded-md border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="johndoe@example.com"
          />
        </div>

        <div className="w-full  mt-2.5 ">
          <label className="  font-semibold  ">Password</label>

          <input
            value={password}
            onChange={(event) =>
              dispatch({
                type: "field",
                fieldName: "password",
                payload: event.currentTarget.value,
              })
            }
            required
            type="password"
            className="w-full mt-2  pl-4  py-2 rounded-md border-2 border-gray-300  outline-none focus:border-indigo-500"
            placeholder="************"
          />
        </div>

        <div className="w-full  mt-2 ">
          <button className=" w-full  mx-auto bg-indigo-500 hover:bg-indigo-600  text-white rounded-md  py-2.5 m-3 font-semibold">
            REGISTER NOW
          </button>
        </div>

        <div className="text-md">
          <span className="  ">Already have an account? </span>
          <Link
            className=" text-indigo-500 hover:underline font-semibold"
            to="/login"
          >
            LogIn
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
