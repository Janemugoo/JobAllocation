"use client";
import TableComponent from "@/components/Accordion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetTasksforWeeks, useJobs } from "@/hooks";
import { Button, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Material-UI Download icon
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Page() {
  const pdfRef = useRef(null);
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false); //manages open status of create task dialog
  const [todoList, setTodoList] = useState<string[]>([]); // State to manage the to-do list
  const { createTaskRow, tasks } = useJobs();
  const { error, loading } = useGetTasksforWeeks();
  if (loading) return <div>Loading...</div>;
  if (!tasks) return <div>Sorry something went wrong, No Task</div>;

  const handleDownload = () => {
    const input = pdfRef.current;
    if (!input) {
      console.error("pdfRef.current is null");
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("TaskPage.pdf");
    });
  };

  return (
    <>
      <main className="py-4 px-6 flex flex-col justify-center items-start gap-4 ">
        <div className="flex justify-between items-center w-full">
          <div>
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              textAlign="center"
              mt={3} // Adjust the margin-top as needed
            >
              Check Your Assigned Task and Lets Get Going
            </Typography>
          </div>
          <div>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>{" "}
          {/**opens the create task dialog onclick */}
        </div>
        <div
          className="flex gap-4 justify-items-center justify-normal w-full"
          ref={pdfRef}
        >
          <div className=" basis-3/4">
            <TableComponent />
          </div>
          <div className="basis-1/4 bg-borderColor-primary p-4 rounded-md">
            <Calendar
              className="w-full border-2 border-solid border-gray-300 rounded-md mb-4"
              tileContent={({ date, view }) => {
                if (
                  view === "month" &&
                  date.getDate() === new Date().getDate()
                ) {
                  return (
                    <div className="w-3 h-3 bg-brown-500 rounded-full mx-auto mt-1" />
                  );
                }
                return null;
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
