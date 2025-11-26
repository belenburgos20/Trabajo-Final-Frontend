import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const GeneralLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header común del portal general */}
      <Header />

      {/* Contenido */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GeneralLayout;
