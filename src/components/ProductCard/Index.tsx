type ProductCardProps = {
  name?: string;
  price?: number;
  image?: string;
  onAddToCart?: () => void;
};

function ProductCard({
  name = "Producto sin nombre",
  price = 0,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        width: "220px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "140px",
          background: "#f2f2f2",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <span style={{ fontSize: "12px", color: "#888" }}>
            Sin imagen
          </span>
        )}
      </div>

      <h3 style={{ fontSize: "16px", margin: "0" }}>{name}</h3>

      <p style={{ margin: "0", fontWeight: 600 }}>${price.toFixed(2)}</p>

      <button
        onClick={onAddToCart}
        style={{
          padding: "8px",
          borderRadius: "6px",
          background: "#007bff",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductCard;
