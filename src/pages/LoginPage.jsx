import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-[#fcfbf8]">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-4 py-12">
            {/* Card */}
            <div className="w-full max-w-2xl rounded-xl bg-brown-200 px-30 py-15 shadow-sm">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
                    Login
                </h1>

                <form className="flex flex-col gap-5">
                   
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
                        Login
                    </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-700">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-medium text-gray-900 underline underline-offset-2 hover:text-gray-700">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    </div>
    )
}
export default LoginPage;