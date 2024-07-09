import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <main className="">
      <div>
        <h1 className="text-center font-bold">Welcome to Edusphere Project </h1>
      </div>
      <div className="flex justify-center ">
        <Button variant="outline">Enter Project</Button>   
      </div> 
    </main>
  );
}
