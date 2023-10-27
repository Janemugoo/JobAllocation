"use client";
import ManagerTable from "@/components/ManagerTable";
import StaffTable from "@/components/StaffTable";
import React, { useState } from "react";

export default function Page() {
  return (
    <>
      <div>Welcome Admin</div>
      <ManagerTable/>
      <StaffTable/>
    </>
  );
}

