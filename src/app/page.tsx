"use client";
// CombineApp.tsx
import React from "react";
import "./globals.css";
import KanbanBoard from "@/components/KanbanBoard";
import { AppLayout } from "@/components/AppLayout";

function CombineApp() {
  return (
    <AppLayout>
      <KanbanBoard />
    </AppLayout>
  );
}

export default CombineApp;
