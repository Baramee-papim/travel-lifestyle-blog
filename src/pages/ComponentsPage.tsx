import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { Toaster } from "../components/ui/sonner";
import * as Icons from "../components/icon";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const iconEntries = Object.entries(Icons);
const buttonStates = ["default", "Hover", "Pressed", "Disable"] as const;
const buttonVariants = ["default", "outline", "link"] as const;

const ComponentsPage = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center gap-4 py-10">
                {/* Blog Card */}
                <div className="flex flex-col w-1/2 gap-4">
                <BlogCard
                id={1}
                image="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/e739huvlalbfz9eynysc.jpg"
                category="General"
                title="Sample card"
                description="This is a preview card used on the components page."
                author="Thompson P."
                date="23 April 2026"
                />
                </div>
                {/* Icons */}
                <div className="w-1/2 mt-8">
                    <h2 className="text-xl font-semibold mb-4">Icons</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {iconEntries.map(([name, src]) => (
                            <div
                                key={name}
                                className="flex flex-col items-center gap-2 rounded-md border p-3"
                            >
                                <img src={src} alt={name} className="w-6 h-6" />
                                <span className="text-xs text-center">{name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <h1 className="text-3xl font-semibold mt-8 mb-4">Buttons</h1>
                <div className="w-1/2 grid grid-cols-3 gap-x-10 gap-y-6">
                    {buttonStates.map((state) =>
                        buttonVariants.map((variant) => (
                            <div key={`${state}-${variant}`} className="flex justify-center">
                                <Button variant={variant} state={state} className="w-[150px]">
                                    {state}
                                </Button>
                            </div>
                        ))
                    )}
                </div>
                <h1 className="text-3xl font-semibold mt-8 mb-4">Toasts</h1>
                <div className="flex gap-4">
                <Button variant="default" state="default" className="w-[200px] bg-green-500" onClick={() => toast.success("Hello World")} >Show success Toast</Button>
                <Button variant="default" state="default" className="w-[200px] bg-red-500" onClick={() => toast.error("Hello World")} >Show error Toast</Button>
                </div>
            </div>
            <Footer />
            <Toaster />            
        </div>
    );
}
export default ComponentsPage;