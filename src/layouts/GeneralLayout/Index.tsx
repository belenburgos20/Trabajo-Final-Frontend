import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Index';
import Footer from '../../components/Footer/Index';

const GeneralLayout = () => {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />

      <main className="main-content p-4 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default GeneralLayout;
