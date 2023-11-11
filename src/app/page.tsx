"use client"
import { AppLayout } from "@/components/AppLayout";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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

const initialData:Category = {
  toDo: [
    { id: 'task-1', content: 'Task 1 - To Do' },
    { id: 'task-2', content: 'Task 2 - To Do' },
    // Add more tasks as needed
  ],
  inProgress: [
    { id: 'task-3', content: 'Task 3 - In Progress' },
    { id: 'task-4', content: 'Task 4 - In Progress' },
    // Add more tasks as needed
  ],
  completed: [
    { id: 'task-5', content: 'Task 5 - Completed' },
    { id: 'task-6', content: 'Task 6 - Completed' },
    // Add more tasks as needed
  ],
};

export default function Home() {
  const [tasks, setTasks] = useState<Category>(initialData);

  const handleDragEnd = (result: DropResult) => {
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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={3}>
          {Object.entries(tasks).map(([category, items]) => (
            <Grid item key={category} xs={12} sm={4}>
              <Paper elevation={3} style={{ padding: '16px', minHeight: '200px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                  {category}
                </Typography>
                <Droppable droppableId={category}>
                  {(provided) => (
                    <List className="bg-primary" ref={provided.innerRef} {...provided.droppableProps}>
                      {items.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                // Add styles based on snapshot.isDragging if needed
                              }} 
                            >
                              <ListItemText primary={task.content} />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Container>
    </AppLayout>
  );
}
