import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function PublicLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100dvh', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
