import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import type { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../redux/api/usersApiSlice";
import { Button } from "../components/ui/button";
import Loader from "../components/Loader";
import { setCredentials } from "../redux/features/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateProfileApi, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await updateProfileApi({
        email: email,
        name: name,
      }).unwrap();
      dispatch(setCredentials(data));
      alert("Profile Updated");
    } catch (error) {
      alert(
        (error as any)?.data?.message ||
          (error as any)?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <section className="flex justify-center items-center h-[calc(100vh-48px)]">
      <form
        onSubmit={submitHandler}
        className="max-w-[400px] bg-white p-10 w-[90%] rounded-2xl flex flex-col gap-4 text-black"
      >
        <Input
          placeholder="Name"
          type="text"
          className="border border-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          className="border border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="cursor-pointer" disabled={isLoading} type="submit">
          {isLoading ? <Loader /> : "Update"}
        </Button>
      </form>
    </section>
  );
};

export default Profile;
