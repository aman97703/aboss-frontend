import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "../redux/api/usersApiSlice";
import { setCredentials } from "../redux/features/authSlice";

const Singup = () => {
  const dispatch = useDispatch();
  const [signupApiCall, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      const data = await signupApiCall({
        email: email,
        password: password,
        name: name,
      }).unwrap();
      dispatch(setCredentials(data));
      alert("Registration Successful");
      navigate("/dashboard");
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
        <Input
          placeholder="Password"
          type="password"
          className="border border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          className="border border-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className="cursor-pointer" disabled={isLoading} type="submit">
          {isLoading ? <Loader /> : "Signup"}
        </Button>

        <div className="mt-4">
          <p className="">
            Already registered?{" "}
            <Link to={"/login"} className="hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Singup;
