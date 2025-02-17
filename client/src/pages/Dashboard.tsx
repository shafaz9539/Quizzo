import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PopUp } from "@/components/PopUp";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

interface Quiz {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
}

function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const location = useLocation();
  const teacherId = location.state?.id;
  const userName = location.state?.name;

  const fetchQuizzes = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/quizzes/teacherID/${teacherId}`)
      .then((response) => {
        setQuizzes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const deleteQuiz = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/quizzes/${id}`);
      toast.success("Quiz deleted successfully");
      fetchQuizzes();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(`${err.response.data.message}`);
        console.error("Error: ", err.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const quizzesList = quizzes.map((quiz) => (
    <TableRow key={quiz.id}>
      <TableCell>{quiz.id}</TableCell>
      <TableCell>{quiz.title}</TableCell>
      <TableCell>{quiz.description}</TableCell>
      <TableCell>{quiz.teacher_id}</TableCell>
      <TableCell className="flex flex-col gap-2 lg:flex-row">
        <PopUp
          title={quiz.title}
          teacherId={quiz.teacher_id}
          description={quiz.description}
          id={quiz.id}
          refreshQuizzes={fetchQuizzes}
        />
        <Button variant={"destructive"} onClick={() => deleteQuiz(quiz.id)}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <Navbar
        userName={userName}
        teacherId={teacherId}
        refreshQuizzes={fetchQuizzes}
      />
      <div className="mx-2 mt-6 xl:w-[80vw] xl:place-self-center">
        {quizzes.length === 0 ? (
          <h1 className="text-center text-lg md:text-xl lg:text-3xl font-semibold">
            Create a Quiz to get started
          </h1>
        ) : (
          <>
            <h1 className="text-center text-lg  md:text-xl lg:text-3xl font-semibold mb-6">
              List of Quizzes created by you
            </h1>
            <Table className="border-3 place-self-center">
              <TableCaption>A list of your recent Quizzes.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">Id</TableHead>
                  <TableHead className="w-[180px]">TItle</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Teacher ID</TableHead>
                  <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{quizzesList}</TableBody>
            </Table>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
