import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SignupPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const validateForm = () => {
        if (!name || !username || !email || !password) {
            setIsError(true);
            toast.error("Please fill in all fields");
            return false;
        }
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        try {
            const response = await axios.post("https://blog-post-project-api.vercel.app/auth/signup", { name, username, email, password });
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-[#fcfbf8]">
            <Navbar />
            <div className="flex flex-col items-center justify-center px-4 py-12">
                {/* Card */}
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
                                type="password"
                                placeholder="Password"
                                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                            />
                        </div>
                        <div className="flex justify-center">
                        <Button
                            type="submit"
                            className="mt-2 w-full max-w-30 rounded-full bg-gray-900 py-2.5 font-medium text-white hover:bg-gray-800"
                        >
                            Sign up
                        </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-700">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
