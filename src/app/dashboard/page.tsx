"use client";
// CombineApp.tsx
import React from "react";
import KanbanBoard from "@/components/KanbanBoard";
import { AppLayout } from "@/components/AppLayout";
import { Guard } from "@/components/Gaurd";

function CombineApp() {
  return (
    <Guard>
      <AppLayout>
        <KanbanBoard />
      </AppLayout>
    </Guard>
  );
}

export default CombineApp;
