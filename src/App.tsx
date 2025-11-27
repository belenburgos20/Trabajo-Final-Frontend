import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layouts
import GeneralLayout from './layouts/GeneralLayout/Index';
import ClientesLayout from './layouts/ClientesLayout/Index';
import AdminLayout from './layouts/AdminLayout/Index';

// General pages
import Home from './pages/General/Home';
import Contact from './pages/General/Contact';
import Login from './pages/General/Login';
import Register from './pages/General/Register';

// Clientes pages
import Perfil from './pages/Clientes/Perfil';
import Productos from './pages/Clientes/Productos';
import Carrito from './pages/Clientes/Carrito';
import Presupuestos from './pages/Clientes/Presupuestos';

// Admin pages
import Dashboard from './pages/Admin/Dashboard';
import AdminClientes from './pages/Admin/Clientes';
import AdminProductos from './pages/Admin/Productos';
import AdminPresupuestos from './pages/Admin/Presupuestos';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* General */}
        <Route element={<GeneralLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Portal Clientes */}
        <Route path="/clientes" element={<ClientesLayout />}>
          <Route path="perfil" element={<Perfil />} />
          <Route path="productos" element={<Productos />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="presupuestos" element={<Presupuestos />} />
        </Route>

        {/* Portal Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clientes" element={<AdminClientes />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="presupuestos" element={<AdminPresupuestos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
