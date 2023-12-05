import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const state = true;

export default function Home() {
  return (
    <div className="">
      <p className="text-3xl font-bold text-indigo-500">Hello world!</p>
      <Button>Click Me</Button>
    </div>
  )
}
