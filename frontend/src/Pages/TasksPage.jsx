import { useEffect } from "react";
import { useTasks } from "../Context/TaskContext";
import { Box, Container } from "@mui/material";
import Card from "../Components/CardTasks";
import { useAuth } from "../Context/authContext";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();
  const { getProfile } = useAuth();

  useEffect(() => {
    getTasks();
    getProfile();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box display="flex" flexDirection="row" flexWrap="wrap" gap={6}>
        {tasks.length === 0 && (
          <h2 className="">Aún no tienes tareas creadas.</h2>
        )}
        {tasks.map((task) => (
          <Card key={task._id} sx={{ minWidth: 0 }} task={task} />
        ))}
      </Box>
    </Container>
  );
};

export default TasksPage;
