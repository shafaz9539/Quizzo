import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"


export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const navigate = useNavigate();

  const formChange = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`, { name, email, password }
      );
      navigate("/dashboard", {
        state: { id: response.data.user.id, name: response.data.user.name },
      });
      console.log("Response from Signup:", response.data.message);
      toast.success(response.data.message)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(`${err.response.data.message}`);
        console.error("Error: ", err.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
        
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl place-self-center">
            Create an Account
          </CardTitle>
          <CardDescription className="place-self-center">
            Enter your below details to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formChange}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="eg: John Doe"
                  name="name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="eg: m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required name="password" />
              </div>
              <div className="grid gap-2">
                <Button type="submit" className="w-full">
                  Signup
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/" className="underline underline-offset-4">
                login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
