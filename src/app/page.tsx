import { AppLayout } from "@/components/AppLayout";
export default function Home() {

  return (
    <AppLayout>
      <div className="p-4">
        <h1>Welcome to the Dashboard</h1>

        <div className="flex justify-evenly p-2 gap-4">
          <div className="w-1/4 border p-4">
            <h2 className="text-xl font-semibold">TO DO</h2>
            {/* I'll add TO DO tasks here */}
          </div>
          <div className="w-1/4 border p-2">
            <h2 className="text-xl font-semibold">IN PROGRESS</h2>
            {/* I'll add IN PROGRESS tasks here */}
          </div>
          <div className="w-1/4 border p-2">
            <h2 className="text-xl font-semibold">IN REVIEW</h2>
            {/* I'll add IN REVIEW tasks here */}
          </div>
          <div className="w-1/4 border p-2">
            <h2 className="text-xl font-semibold">COMPLETED</h2>
            {/* I'll add COMPLETED tasks here */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
