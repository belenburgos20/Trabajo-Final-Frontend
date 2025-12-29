import { Outlet, Navigate } from 'react-router-dom';
import Header from '../../components/Header/Index';
import Sidebar from '../../components/Sidebar/Index';
import Footer from '../../components/Footer/Index';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const AdminLayout = () => {
  const appCtx = useContext(AppContext);

  if (!appCtx || !appCtx.user || !appCtx.user.esAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-1 overflow-hidden">
        <Sidebar variant="admin" />
        <main className="client-content p-4 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
