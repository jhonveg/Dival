import { Box, Container, Input, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useForm } from "react-hook-form";
import { useTasks } from "../Context/TaskContext";
import { useNavigate } from "react-router-dom";

const TaskFormPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  // const isDarkMode = useIsDarkMode();

  const { tasks, createTask, getTasks } = useTasks();

  const submit = handleSubmit((data) => {
    const res = createTask(data);
    console.log(res);
    navigate("/tasks");
  });

  return (
    <Container
      className=" rounded-lg"
      maxWidth="xs"
      sx={{ alignItems: "center" }}
    >
      <Box
        className="rounded-lg pb-14 "
        sx={{ mt: 20 }}
        flexDirection={"column"}
      >
        <Typography
          className="bg-zinc-900"
          variant="h4"
          color={"white"}
          gutterBottom
        >
          Tasks Form
        </Typography>

        <form className="bg-zinc-900 rounded-md" onSubmit={submit}>
          <Input
            className="w-32 h-10 mt-5 ml-32  px- rounded-md "
            sx={{ color: "white" }}
            aria-label="Demo input"
            placeholder="Titulo de la tarea"
            autoFocus
            {...register("title")}
          />

          <TextareaAutosize
            className="w-80 mt-2 ml-8 text-sm font-normal font-sans leading-normal p-3 rounded-xl rounded-br-none shadow-lg s dark:shadow-slate-900 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500  focus:border-purple-500  bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0"
            aria-label="empty textarea"
            placeholder="Descripción"
            {...register("description")}
          />

          <Box>
            <button
              type="submit"
              className=" ml-32  mt-5 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Crear Tarea
            </button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default TaskFormPage;
