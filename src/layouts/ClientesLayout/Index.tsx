import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Index';
import Header from '../../components/Header/Index';
import Footer from '../../components/Footer/Index';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const ClientesLayout = () => {
  const appCtx = useContext(AppContext);

  if (!appCtx || !appCtx.user) {
    return <Navigate to="/login" replace />;
  }

  // si el usuario es admin, redirigir al dashboard admin
  if (appCtx.user.esAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-1 overflow-hidden">
        <Sidebar variant="clientes" />
        <main className="client-content p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ClientesLayout;
