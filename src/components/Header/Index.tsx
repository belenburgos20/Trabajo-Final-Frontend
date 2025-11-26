import { Link } from "react-router-dom";

type HeaderProps = {
  title?: string;
};

function Header({ title = "Mi Proyecto" }: HeaderProps) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>{title}</h1>

      <nav style={{ display: "flex", gap: "16px" }}>
        <Link to="/">Inicio</Link>
        <Link to="/contact">Contacto</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
