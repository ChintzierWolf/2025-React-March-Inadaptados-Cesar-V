import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Checkbox, IconButton, Paper, Typography } from "@mui/material";

function TodoItem({ todo, onToggle, onDelete }) {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": {
          elevation: 3,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
        },
        transition: "all 0.2s",
      }}
    >
      <Checkbox
        checked={todo.done}
        onChange={handleToggle}
        id={`todo-${todo.id}`}
        color="primary"
      />

      <Box sx={{ flex: 1 }}>
        <Typography
          component="label"
          htmlFor={`todo-${todo.id}`}
          sx={{
            textDecoration: todo.done ? "line-through" : "none",
            color: todo.done ? "text.secondary" : "text.primary",
            cursor: "pointer",
            userSelect: "none",
            fontSize: "1.1rem",
          }}
        >
          {todo.title}
        </Typography>
      </Box>

      <IconButton
        onClick={handleDelete}
        color="error"
        aria-label="Eliminar tarea"
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
}

export default TodoItem;
