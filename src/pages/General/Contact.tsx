import { useState } from 'react';
import '../../../public/assets/css/General/Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus({ type: 'success', message: '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.' });
      setForm({ nombre: '', email: '', telefono: '', mensaje: '' });
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">Contáctanos</h1>
            <p className="contact-hero-subtitle">
              Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
            </p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="contact-content">
          <section className="contact-info-section">
            <h2 className="section-title">Información de Contacto</h2>
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-icon">📞</div>
                <h3>Teléfono Administración</h3>
                <a 
                  href="https://wa.me/5492914235761" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-phone-link"
                >
                  +54 9 291 423-5761
                </a>
                <p className="contact-info-hours">Lun - Vie: 8:00 - 17:00</p>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon">✉️</div>
                <h3>Email</h3>
                <a 
                  href="mailto:claudioguardese@gmail.com" 
                  className="contact-email-link"
                >
                  claudioguardese@gmail.com
                </a>
                <p className="contact-info-hours">Respuesta en 24hs</p>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon">📍</div>
                <h3>Dirección</h3>
                <p>Bravard 1469</p>
                <p className="contact-info-hours">Bahia Blanca, Buenos Aires, Argentina</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Bravard+1469,+Bahia+Blanca,+Buenos+Aires,+Argentina" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-maps-link"
                >
                  🗺️ Ver en Google Maps
                </a>
              </div>
              <div className="contact-info-card">
                <div className="contact-icon">🕒</div>
                <h3>Horarios</h3>
                <p>Lunes a Viernes</p>
                <p className="contact-info-hours">7:00 - 17:00 hs</p>
              </div>
            </div>
          </section>

          <section className="contact-form-section">
            <div className="contact-form-wrapper">
              <div className="contact-form-header">
                <h2>Envíanos un Mensaje</h2>
                <p>Completa el formulario y nos pondremos en contacto contigo</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo *</label>
                  <input
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ingresa tu nombre"
                    className="form-control contact-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      type="email"
                      className="form-control contact-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                      id="telefono"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+54 11 1234-5678"
                      type="tel"
                      className="form-control contact-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="form-control contact-input contact-textarea"
                    rows={6}
                    required
                  />
                </div>

                {status.type && (
                  <div className={`form-status ${status.type}`}>
                    {status.type === 'success' ? '✓' : '✗'} {status.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-accent contact-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
