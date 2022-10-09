import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const ResetPasssword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const hanldeResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      toast.error("Password do not match");
    }
    try {
      const { data } = await axios.put(
        `https://demo-server-lokesh.herokuapp.com/api/resetpassword/${id}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        setShow(true);
        toast.success("New password created.");
      }
    } catch (error: any) {
      toast.error(error.message);
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }
  };
  return (
    <div className={`flex flex-col justify-center items-center h-screen  `}>
      {show && (
        <div className="flex justify-center mb-4 w-96 text-xl">
          <h1>Now you may login, </h1>
          <button
            className="underline ml-2 font-bold text-blue-500"
            onClick={() => navigate("/login", { replace: true })}
          >
            LogIn
          </button>
        </div>
      )}
      <form
        onSubmit={hanldeResetPassword}
        className=" flex flex-col p-4   w-96 border-2 rounded border-gray-200 "
      >
        <h1 className=" text-2xl font-bold text-center ">
          Create New Password
        </h1>

        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">New Password</label>

          <input
            type="password"
            placeholder="************"
            required
            value={password}
            onChange={(event) => setPassword(event?.target.value)}
            className="w-full mt-2  pl-4  py-2 rounded-sm border-2 border-gray-300  outline-none focus:border-indigo-500"
          />
        </div>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Confirm New Password</label>

          <input
            type="password"
            placeholder="************"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event?.target.value)}
            className="w-full mt-2  pl-4  py-2 rounded-sm border-2 border-gray-300  outline-none focus:border-indigo-500"
          />
        </div>

        <div className="w-full  mt-2 ">
          <button
            type="submit"
            className=" w-full  mx-auto bg-indigo-500 hover:bg-indigo-600 text-white rounded-sm  py-2.5 m-3 font-semibold"
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <ThreeDots
                  height="25"
                  width="50"
                  radius="9"
                  color="#ffffff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  visible={true}
                />
              </div>
            ) : (
              " Create New Password"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ResetPasssword;
