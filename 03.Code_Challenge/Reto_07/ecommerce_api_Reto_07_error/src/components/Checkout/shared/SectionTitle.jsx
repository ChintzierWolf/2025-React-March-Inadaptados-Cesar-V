// Componente reutilizable para títulos de sección
const SectionTitle = ({ children }) => {
  return (
    <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginTop: '2rem' }}>
      {children}
    </h2>
  );
};

export default SectionTitle;
