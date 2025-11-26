type SidebarItem = {
  label: string;
  path?: string; // opcional porque el sidebar aún no sabe cómo navegar
  onClick?: () => void;
};

type SidebarProps = {
  title?: string;
  items?: SidebarItem[];
};

function Sidebar({
  title = "Menú",
  items = [],
}: SidebarProps) {
  return (
    <aside
      style={{
        width: "220px",
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            style={{
              padding: "10px",
              textAlign: "left",
              background: "#f5f5f5",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
//cuando después tengamos la navegación real con react-router-dom haecemos onClick={() => navigate("/ruta")}

