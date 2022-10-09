import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hanldeForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://demo-server-lokesh.herokuapp.com/api/forgotpassword",
        { email },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        setEmail("");
        setIsLoading(false);
        toast.success("Password reset email sent.");
      }
    } catch (error: any) {
      toast.error(error.message);
      setEmail("");
      setIsLoading(false);
    }
  };
  return (
    <div className={`flex flex-col  justify-center items-center h-screen  `}>
      <form
        onSubmit={hanldeForgotPassword}
        className=" flex flex-col p-4  w-96 border-2 rounded border-gray-200 "
      >
        <h1 className=" text-2xl font-bold text-center ">Forgot Password</h1>
        <div className="w-full mt-2.5  ">
          <label className="   font-semibold px-1">Email</label>
          <input
            type="email"
            placeholder="johndoe@example.com"
            required
            value={email}
            onChange={(event) => setEmail(event?.target.value)}
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
              " Send Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
