import { ReactNode } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type MainLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode; // Sidebar opcional
};

function MainLayout({ children, sidebar }: MainLayoutProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <div style={{ display: "flex", flex: 1 }}>
        {sidebar && (
          <aside style={{ width: "220px", borderRight: "1px solid #ddd" }}>
            {sidebar}
          </aside>
        )}

        <main style={{ flex: 1, padding: "20px" }}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
