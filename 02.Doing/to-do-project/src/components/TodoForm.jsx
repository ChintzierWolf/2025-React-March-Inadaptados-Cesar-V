import AddIcon from "@mui/icons-material/Add";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";

function TodoForm({ onAdd }) {
  // onAdd es una función pasada como prop para agregar una nueva tarea
  // useState se utiliza para manejar el estado del título de la tarea y los errores de validación
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que el título no esté vacío
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("El título no puede estar vacío");
      return;
    }

    // Agregar la tarea
    onAdd(trimmedTitle);

    // Limpiar el formulario
    setTitle("");
    setError("");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    // Limpiar error cuando el usuario empieza a escribir
    if (error) {
      setError("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <TextField
          fullWidth
          label="Nueva tarea"
          value={title}
          onChange={handleChange}
          placeholder="¿Qué necesitas hacer?"
          error={!!error}
          variant="outlined"
          size="medium"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon />}
          disabled={!title.trim()}
          sx={{ minWidth: "120px", height: "56px" }}
        >
          Agregar
        </Button>
      </Box>

      {error && (
        <Alert severity="error" role="alert" sx={{ mt: 2 }}>
          ⚠️ {error}
        </Alert>
      )}
    </Box>
  );
}

export default TodoForm;
