import { ReactNode } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div style={styles.wrapper}>
      <Header />

      <div style={styles.contentWrapper}>
        <Sidebar variant="admin" />

        <main style={styles.mainContent}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100vh",
  },

  contentWrapper: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },

  mainContent: {
    flex: 1,
    padding: "20px",
    overflowY: "auto" as const,
  },
};

export default AdminLayout;
