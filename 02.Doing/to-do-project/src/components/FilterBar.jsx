
import { Box, Button, ButtonGroup } from "@mui/material";
// Componente FilterBar que muestra botones para filtrar tareas
// Los componentes Box, Button y ButtonGroup son de la librería Material-UI
// Material-UI proporciona componentes preestilizados para construir interfaces de usuario

function FilterBar({ filter, onFilterChange }) {
  const filters = [
    { value: "all", label: "Todas" },
    { value: "active", label: "Pendientes" },
    { value: "done", label: "Hechas" },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
      <ButtonGroup variant="outlined" size="large">
        {filters.map((filterOption) => (
          <Button
            key={filterOption.value}
            onClick={() => onFilterChange(filterOption.value)}
            variant={filter === filterOption.value ? "contained" : "outlined"}
            color="primary"
            sx={{ minWidth: "120px" }}
          >
            {filterOption.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
}

export default FilterBar;
