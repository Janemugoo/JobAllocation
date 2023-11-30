"use client";
import ManagerTable from "@/components/ManagerTable";
import StaffTable from "@/components/StaffTable";
import TaskTable from "@/components/TaskTable";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AssignedTable from "@/components/AssignedTable";

enum AdminTabs {
  MANAGERS = "managers",
  STAFFS = "staffs",
  UNASSIGNEDTASKS = "unassignedtasks",
  ASSIGNEDTASKS = "assignedtasks",
}

export default function Page() {
  const [selectedTab, setSelectedTab] = useState(() => AdminTabs.MANAGERS);
  const handleTabChange = (
    event: any,
    newValue: React.SetStateAction<AdminTabs>
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
        value={AdminTabs.MANAGERS}
          label="Managers"
          className="py-2 px-6 hover:bg-gray-300  hover:text-black transition duration-300"
        />
        <Tab
         value={AdminTabs.STAFFS}
          label="Staffs"
          className="py-2 px-6 hover:bg-gray-300  hover:text-black transition duration-300"
        />
        <Tab
         value={AdminTabs.UNASSIGNEDTASKS}
          label="Unassigned Tasks"
          className="py-2 px-6 hover:bg-gray-300  hover:text-black transition duration-300"
        />
        <Tab
         value={AdminTabs.ASSIGNEDTASKS}
          label="Assigned Tasks"
          className="py-2 px-6 hover:bg-gray-300  hover:text-black transition duration-300"
        />
      </Tabs>

     <TabsBody 
     selectedTab={selectedTab}
     />
    </div>
  );
}



function TabsBody({selectedTab}:{selectedTab: AdminTabs}) {
  switch (selectedTab) {
    case AdminTabs.MANAGERS:
      return <ManagerTable />;
    case AdminTabs.STAFFS:
      return <StaffTable />;
    case AdminTabs.UNASSIGNEDTASKS:
      return <TaskTable />;
    case AdminTabs.ASSIGNEDTASKS:
      return <AssignedTable />;
  }
}
