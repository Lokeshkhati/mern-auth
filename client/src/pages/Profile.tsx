import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", email: "" });
  const { firstName, lastName, email } = user;

  const getUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_ENDPOINT}/api/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            // @ts-ignore
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const { user } = data;
      const { firstName, lastName, email } = user;
      setUser({ firstName, lastName, email });
      console.log(user);
    } catch (error) {
      //  catch (error: any) {}
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h1 className="text-xl font-semibold">FirstName : {firstName}</h1>
      <h1 className="text-xl font-semibold">LastName : {lastName}</h1>
      <h1 className="text-xl font-semibold">Email : {email}</h1>
    </div>
  );
};

export default Profile;
