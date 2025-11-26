function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "16px 20px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        marginTop: "40px",
        fontSize: "14px",
        color: "#555",
      }}
    >
      © {new Date().getFullYear()} Mi Proyecto – Todos los derechos reservados.
    </footer>
  );
}

export default Footer;
