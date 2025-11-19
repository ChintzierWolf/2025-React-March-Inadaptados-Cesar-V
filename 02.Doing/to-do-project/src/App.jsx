import { Box, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import FilterBar from "./components/FilterBar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  // Estado para las tareas - carga desde localStorage o usa tareas de ejemplo
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [
      { id: "1", title: "Comprar leche", done: false },
      { id: "2", title: "Estudiar React", done: true },
      { id: "3", title: "Hacer ejercicio", done: false },
    ];
  });

  // Estado para el filtro actual
  const [filter, setFilter] = useState("all");

  // Guardar en localStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Función para agregar una nueva tarea
  const handleAddTodo = (title) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Función para marcar/desmarcar tarea como completada
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // Función para eliminar una tarea
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Función para cambiar el filtro
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filtrar tareas según el filtro actual
  const getFilteredTodos = () => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.done);
      case "done":
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  };

  // Calcular estadísticas
  const pendingCount = todos.filter((todo) => !todo.done).length;
  const doneCount = todos.filter((todo) => todo.done).length;

  const filteredTodos = getFilteredTodos();

  return (
    <Container maxWidth={false} sx={{ width: "100%", py: 4, px: 2 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: "800px", margin: "0 auto" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          color="primary"
        >
          📝 To-Do List
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TodoForm onAdd={handleAddTodo} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FilterBar filter={filter} onFilterChange={handleFilterChange} />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        </Box>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid #e0e0e0",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            📊 {pendingCount} pendiente{pendingCount !== 1 ? "s" : ""} /{" "}
            {doneCount} hecha{doneCount !== 1 ? "s" : ""}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
