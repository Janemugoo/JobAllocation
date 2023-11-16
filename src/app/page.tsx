"use client";
import { AppLayout } from "@/components/AppLayout";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from '@mui/material';
import { useState } from "react";

interface Task {
  id: string;
  content: string;
}

interface Category {
  [key: string]: Task[];
}

const initialData: Category = {
  ToDo: [
    { id: 'task-1', content: 'Task 1 - Wifi Connection' },
    { id: 'task-2', content: 'Task 2 - Write Report' },
    // Add more tasks as needed
  ],
  InProgress: [
    { id: 'task-3', content: 'Task 3 - In Progress' },
    { id: 'task-4', content: 'Task 4 - In Progress' },
    // Add more tasks as needed
  ],
  Completed: [
    { id: 'task-5', content: 'Task 5 - Completed' },
    { id: 'task-6', content: 'Task 6 - Completed' },
    // Add more tasks as needed
  ],
};

export default function Home() {
  const [tasks, setTasks] = useState<Category>(initialData);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return; // Drop outside the list
    }

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;

    if (sourceCategory === destinationCategory) {
      // Move within the same category
      const updatedTasks = { ...tasks };
      const reorderedItems = Array.from(tasks[sourceCategory]);
      const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, reorderedItem);
      updatedTasks[sourceCategory] = reorderedItems;
      setTasks(updatedTasks);
    } else {
      // Move between categories
      const updatedTasks = { ...tasks };
      const sourceItems = Array.from(tasks[sourceCategory]);
      const destinationItems = Array.from(tasks[destinationCategory]);

      const [movedItem] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, movedItem);

      updatedTasks[sourceCategory] = sourceItems;
      updatedTasks[destinationCategory] = destinationItems;
      setTasks(updatedTasks);
    }
  };

  return (
    <AppLayout>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Task Board
        </Typography>
        <DndProvider backend={HTML5Backend}>
          <Grid container spacing={3}>
            {Object.entries(tasks).map(([category, items]) => (
              <Grid item key={category} xs={12} sm={4}>
                <Paper elevation={3} style={{ padding: '16px', minHeight: '200px' }}>
                  <Typography variant="h6" align="center" gutterBottom>
                    {category}
                  </Typography>
                  <DroppableContainer category={category} items={items} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DndProvider>
      </Container>
    </AppLayout>
  );
}

interface DroppableContainerProps {
  category: string;
  items: Task[];
}

const DroppableContainer: React.FC<DroppableContainerProps> = ({ category, items }) => {
  return (
    <List className="bg-white" style={{ userSelect: 'auto' }}>
      {items.map((task, index) => (
        <TaskItem key={task.id} task={task} index={index} category={category} />
      ))}
    </List>
  );
};


interface TaskItemProps {
  task: Task;
  index: number;
  category: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, category }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, index, category },
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item: any) => {
      // Handle hover logic if needed
    },
    drop: () => {
      // Handle drop logic if needed
    },
  });

  return (
    <div ref={(node) => drag(drop(node))}>
      <Paper
        elevation={3}
        style={{
          marginBottom: '8px',
          opacity: isDragging ? 0.5 : 1, // Optional: reduce opacity when dragging
        }}
      >
        <ListItem>
          <ListItemText primary={task.content} />
        </ListItem>
      </Paper>
    </div>
  );
};
  