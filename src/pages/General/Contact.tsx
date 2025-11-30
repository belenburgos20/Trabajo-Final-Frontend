import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('Mensaje enviado');
      setForm({ nombre: '', email: '', mensaje: '' });
    } catch (err) {
      console.error(err);
      setStatus('Error al enviar');
    }
  };

  return (
    <div className="main-content page">
      <div className="container">
        <section className="section">
          <h1 className="text-primary mb-4">Contacto</h1>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="form-control"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="form-control"
              required
            />

            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              placeholder="Mensaje"
              className="form-control"
              rows={5}
              required
            />

            <button type="submit" className="btn btn-accent w-auto">
              Enviar
            </button>
          </form>
          {status && <p className="mt-3">{status}</p>}
        </section>
      </div>
    </div>
  );
}
