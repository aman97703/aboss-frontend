import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/features/authSlice";
import { useLoginMutation } from "../redux/api/usersApiSlice";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginApiCall, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await loginApiCall({ email: email, password }).unwrap();
      dispatch(setCredentials(data));
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      alert(
        (error as any)?.data?.message ||
          (error as any)?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-48px)]">
      <form
        onSubmit={submitHandler}
        className="max-w-[400px] bg-white p-10 w-full rounded-2xl flex flex-col gap-4 text-black"
      >
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
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
