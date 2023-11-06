"use client";
import ManagerTable from "@/components/ManagerTable";
import StaffTable from "@/components/StaffTable";
import TaskTable from "@/components/TaskTable";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-2 px-4">
      <ManagerTable />
      <StaffTable />
      <TaskTable />
    </div>
  );
}
