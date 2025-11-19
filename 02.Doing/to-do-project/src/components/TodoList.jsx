import { Box, Typography } from "@mui/material";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          color: "text.secondary",
        }}
      >
        <Typography variant="h6">No hay tareas</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          ¡Agrega tu primera tarea arriba!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </Box>
  );
}

export default TodoList;
