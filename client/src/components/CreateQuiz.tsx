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
import { toast } from "sonner"


export default function CreateQuiz(props: {teacherId: number; refreshQuizzes: () => void;}) {

  const [isOpen, setIsOpen] = useState(false); // Modal state

  async function createQuiz(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    try {
      const { teacherId } = props;
      await axios.post(`${import.meta.env.VITE_API_URL}/quizzes`, {title, description, teacherId});
      console.log("Quiz created successfully");
      toast.success("Quiz created successfully");
      setIsOpen(false); 
      props.refreshQuizzes(); 
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
          Create Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Quiz</DialogTitle>
          <DialogDescription>
            Enter below details to create quiz. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action={createQuiz}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              name="title"
              id="title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              name="description"
              id="description"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
