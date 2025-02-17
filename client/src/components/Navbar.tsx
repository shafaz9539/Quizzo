import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import CreateQuiz from "./CreateQuiz";
import { toast } from "sonner";
import { Menu, X } from "lucide-react"; // Icons for Hamburger

function Navbar(props: { userName: string; teacherId: number; refreshQuizzes: () => void }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white border-2 h-[60px] flex justify-between items-center p-4">
      <p className="text-md md:text-lg lg:text-2xl font-bold">QUIZZO</p>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        <CreateQuiz teacherId={props.teacherId} refreshQuizzes={props.refreshQuizzes} />
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
        <div className="flex items-center lg:pl-3">
          <Avatar>
            <AvatarImage src="avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-md md:text-xl lg:text-2xl font-medium">{props.userName}</p>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute z-10 top-[60px] right-0 bg-white w-full h-full shadow-md flex flex-col items-center gap-4 p-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <CreateQuiz teacherId={props.teacherId} refreshQuizzes={props.refreshQuizzes} />
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-md font-medium">{props.userName}</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
