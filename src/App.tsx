import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/General/Home';
import Contact from './pages/General/Contact';
import Login from './pages/General/Login';
import Register from './pages/General/Register';

import Carrito from './pages/Clientes/Carrito';
import Perfil from './pages/Clientes/Perfil';
import PresupuestosCliente from './pages/Clientes/Presupuestos';
import ProductosCliente from './pages/Clientes/Productos';

import Dashboard from './pages/Admin/Dashboard';
import ClientesAdmin from './pages/Admin/Clientes';
import PresupuestosAdmin from './pages/Admin/Presupuestos';
import ProductosAdmin from './pages/Admin/Productos';
import NotFound from './pages/General/NotFound';

import PublicLayout from './layouts/PublicLayout';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Portal Clientes*/}
        <Route path="/cliente/carrito" element={<Carrito />} />
        <Route path="/cliente/perfil" element={<Perfil />} />
        <Route path="/cliente/presupuestos" element={<PresupuestosCliente />} />
        <Route path="/cliente/productos" element={<ProductosCliente />} />

        {/*Portal Administrador*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/clientes" element={<ClientesAdmin />} />
          <Route path="/admin/presupuestos" element={<PresupuestosAdmin />} />
          <Route path="/admin/productos" element={<ProductosAdmin />} />
        </Route>

        {/*Portal General con layout público*/}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/*NotFound*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
