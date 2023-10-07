import TaskPanel from "@/components/Accordion";
import { Button, Typography } from "@mui/material";
import React from "react";

export default function Page() {
  return (
    <main className="py-4 px-6 flex flex-col justify-center items-start gap-4 ">
      <div className="flex justify-between items-center w-full">
        <div><Typography>Hello</Typography></div>
        <div><Button color="primary" variant="contained" >Add Task</Button></div>
      </div>
      <div className="flex gap-4 justify-items-center justify-normal w-full">
        <div className=" basis-3/4">
          {[1, 2, 3, 4].map((number) => {
            return <TaskPanel key={number} />;
          })}
          <TaskPanel />
        </div>
        <div className="basis-1/4">Hello World</div>
      </div>
    </main>
  );
}
