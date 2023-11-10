"use client";
import ManagerTable from "@/components/ManagerTable";
import StaffTable from "@/components/StaffTable";
import TaskTable from "@/components/TaskTable";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AssignedTable from "@/components/AssignedTable";

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setSelectedTab(newValue);
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 py-2 px-4">
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        className="rounded-lg overflow-hidden border border-black-300"
      >
        <Tab
          label="Manager Table"
          className="py-2 px-6 hover:bg-purple-300  hover:text-black transition duration-300"
        />
        <Tab
          label="Staff Table"
          className="py-2 px-6 hover:bg-purple-300  hover:text-black transition duration-300"
        />
        <Tab
          label="Task Table"
          className="py-2 px-6 hover:bg-purple-300  hover:text-black transition duration-300"
        />
        <Tab
          label="Task Table"
          className="py-2 px-6 hover:bg-purple-300  hover:text-black transition duration-300"
        />
      </Tabs>

      {selectedTab === 0 && <ManagerTable />}
      {selectedTab === 1 && <StaffTable />}
      {selectedTab === 2 && <TaskTable />}
      {selectedTab === 3 && <AssignedTable />}
    </div>
  );
}
