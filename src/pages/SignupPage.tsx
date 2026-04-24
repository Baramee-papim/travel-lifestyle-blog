import axios from "axios";
import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import Navbar from "../components/Navbar";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setIsError(true);
      toast.error("Please fill in all fields");
      return false;
    }
    setIsError(false);
    return true;
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsError(false);
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_BASE_URL + "/api/auth/register",
        { name, username, email, password },
      );
      console.log(response.data);
      toast.success("Signup successful");
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      toast.error(message || "Signup failed");
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
            Sign up
          </h1>

          <form className="flex flex-col gap-5" onSubmit={handleSignup}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Full name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-900">
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full max-w-30 rounded-full bg-gray-900 py-2.5 font-medium text-white hover:bg-gray-800"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
