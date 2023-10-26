import { AppLayout } from "@/components/AppLayout";
export default function Home() {

  return (
    <AppLayout>
      
      <div className="p-4">
        <h1>Welcome to the Dashboard</h1>

        <div className="flex justify-between p-4 gap-4">
          <div className="w-1/4 border-4 p-4 rounded-l-lg border-l-indigo-500 border-y-indigo-500">
            <h2 className="text-xl font-semibold">TO DO</h2>
           
          
            {/* I'll add TO DO tasks here */}
          </div>
          <div className="w-1/4 border-4 p-4 border-y-indigo-500">
            <h2 className="text-xl font-semibold">IN PROGRESS</h2>
            {/* I'll add IN PROGRESS tasks here */}
          </div>
          <div className="w-1/4 border-4 p-4 border-y-indigo-500">
            <h2 className="text-xl font-semibold">IN REVIEW</h2>
            {/* I'll add IN REVIEW tasks here */}
          </div>
          <div className="w-1/4 border-4 p-4 rounded-t-lg border-r-indigo-500 border-y-indigo-500">
            <h2 className="text-xl font-semibold">COMPLETED</h2>
            {/* I'll add COMPLETED tasks here */}
          </div>
        </div>
       </div>
    </AppLayout>
  );
}
