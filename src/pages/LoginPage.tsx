import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      setIsError(true);
      toast.error("Please fill in all fields");
      return false;
    }
    setIsError(false);
    return true;
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/api/auth/login",
        { email, password },
      );
      const accessToken = response.data?.access_token as string | undefined;
      if (!accessToken) {
        toast.error("Login response did not include a token");
        setIsError(true);
        return;
      }
      await login(accessToken);
      toast.success("Login successful");
      navigate("/");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      toast.error(
        message || "Your password is incorrect of this email doesn't exist",
        { description: "Please try another password or email" },
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl rounded-xl bg-brown-200 px-30 py-15 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Login
          </h1>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className={`text-sm font-medium ${isError ? "text-red-500" : "text-gray-900"}`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className={`w-full rounded-lg border bg-white px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                  isError
                    ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500/30 text-red-500"
                    : "border border-gray-200 focus:border-gray-400 focus:ring-gray-400 text-gray-900"
                }`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (isError) setIsError(false);
                }}
                name="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className={`text-sm font-medium ${isError ? "text-red-500" : "text-gray-900"}`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className={`w-full rounded-lg border bg-white px-4 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
                  isError
                    ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500/30 text-red-500"
                    : "border border-gray-200 focus:border-gray-400 focus:ring-gray-400 text-gray-900"
                }`}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (isError) setIsError(false);
                }}
                name="password"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full max-w-30 rounded-full bg-gray-900 py-2.5 font-medium text-white hover:bg-gray-800 disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
