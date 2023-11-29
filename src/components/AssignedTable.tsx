import { useJobs } from "@/hooks";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { title } from "process";
import React, { useMemo, useRef } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload"; // Material-UI Download icon
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRouter } from "next/navigation";

export default function AssignedTable() {
  const pdfRef = useRef(null);
  const router = useRouter()
  const { assignedJobs } = useJobs();
  const rows = useMemo(() => {
    if (!assignedJobs?.docs.length) return [];
    return assignedJobs.docs.map((doc) => {
      const assignedJob = doc.data();
      return {
        title: assignedJob.title,
        description: assignedJob.description,
        assigneeName: assignedJob.assigneeName,
        docID: doc.id,
      };
    });
  }, [assignedJobs]);

  const handleDownload = () => {
    const input = pdfRef.current;
    if (!input){
      console.error('pdfRef.current is null')
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
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('AssignedTasks.pdf');
    });
  };

  return (
    <>
    <Button
          variant="outlined"
          color="primary"
          startIcon={<CloudDownloadIcon />}
          onClick={handleDownload}
        >
          Download
        </Button>

    <TableContainer component={Paper} className="smaller-table" ref={pdfRef}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task Title</TableCell>
            <TableCell>Task Description</TableCell>
            <TableCell>Staff Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((task) => (
            <TableRow className="cursor-pointer" key={task.docID} onClick={() => {
              router.push(`/tasks/${task.docID}`)
            }}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.assigneeName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
