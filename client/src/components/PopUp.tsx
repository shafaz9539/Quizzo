import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface PopUpProps {
  id: number;
  title: string;
  description: string;
  teacherId: number;
  refreshQuizzes: () => void; 
}

export function PopUp(props: PopUpProps) {
  const [quiz, setQuiz] = useState({
    title: props.title,
    description: props.description,
    teacherId: props.teacherId,
  });

  const [isOpen, setIsOpen] = useState(false); // Modal state

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setQuiz((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function updateQuiz() {
    if (!props.id) {
      console.error("Quiz ID is missing");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/quizzes/${props.id}`, quiz);
      setIsOpen(false); 
      props.refreshQuizzes();
      toast.success("Quiz updated successfully");
    } catch (err) {
      console.error("Error updating quiz:", err);
      if (axios.isAxiosError(err) && err.response) {
        toast.error(`${err.response.data.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} onClick={() => setIsOpen(true)}>
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Quiz</DialogTitle>
          <DialogDescription>
            Make changes to your quiz here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              onChange={handleChange}
              name="title"
              id="title"
              value={quiz.title}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              onChange={handleChange}
              name="description"
              id="description"
              value={quiz.description}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={updateQuiz}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
