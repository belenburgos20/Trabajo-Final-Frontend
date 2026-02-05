import { type ReactNode } from 'react';
import Header from '../../components/Header/Index';
import Footer from '../../components/Footer/Index';

type MainLayoutProps = {
  children: ReactNode;
  sidebar?: ReactNode;
};

const MainLayout = ({ children, sidebar }: MainLayoutProps) => {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-1 overflow-hidden">
        {sidebar && <aside className="client-sidebar">{sidebar}</aside>}
        <main className="client-content p-4 overflow-auto">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
