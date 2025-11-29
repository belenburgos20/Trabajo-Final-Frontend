import { type ReactNode } from 'react';
import Header from '../../components/Header/Index';
import Sidebar from '../../components/Sidebar/Index';
import Footer from '../../components/Footer/Index';

interface AdminLayoutProps {
  children?: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-1 overflow-hidden">
        <Sidebar variant="admin" />
        <main className="client-content p-4 overflow-auto">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
