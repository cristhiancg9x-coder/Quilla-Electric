'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { GlassCard, AnimatedContainer, FloatingAnimation } from './animations';

// Glass Navigation Component
export const GlassNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="glass-nav sticky top-4 z-50 mx-4 mt-4 md:mx-8"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <FloatingAnimation duration={3}>
            <span className="text-2xl">⚡</span>
          </FloatingAnimation>
          <span className="text-xl font-bold text-brand-accent">
            Quilla Electric
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="glass-nav-item text-white hover:text-brand-accent"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-brand-accent transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pt-4 border-t border-white/20"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="block py-2 text-white hover:text-brand-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

// Glass Service Card Component
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  delay?: number;
}

export const GlassServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  href,
  delay = 0,
}) => {
  return (
    <GlassCard delay={delay} className="p-6 cursor-pointer">
      <Link href={href}>
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-4xl text-center"
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-bold text-brand-black text-center">
            {title}
          </h3>
          <p className="text-brand-dark text-center leading-relaxed">
            {description}
          </p>
          <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center justify-center text-brand-accent font-semibold"
          >
            Ver más
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </Link>
    </GlassCard>
  );
};

// Glass Hero Section Component
export const GlassHero = () => {
  return (
    <section className="glass-hero min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black/50 to-brand-dark/50" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <AnimatedContainer>
          <FloatingAnimation duration={4}>
            <div className="text-6xl mb-6">⚡</div>
          </FloatingAnimation>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Soluciones Eléctricas en Arequipa
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Especialistas en Pozos a Tierra, Certificaciones INDECI y Emergencias 24/7.
            Protege tu negocio y familia hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-btn-primary text-center"
            >
              Solicitar Cotización
            </motion.a>
            <motion.a
              href="/servicios"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-btn-secondary text-center"
            >
              Ver Servicios
            </motion.a>
          </div>
        </AnimatedContainer>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-brand-accent/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-brand-orange/10 rounded-full blur-xl"
        />
      </div>
    </section>
  );
};

// Glass Benefits Grid Component
export const GlassBenefitsGrid = () => {
  const benefits = [
    {
      icon: '⚡',
      title: 'Atención Rápida',
      description: 'En Cerro Colorado y todo Arequipa. Llegamos antes de que se descongele tu refri.',
    },
    {
      icon: '📜',
      title: 'Certificados INDECI',
      description: 'Firmados por ingenieros colegiados. Garantizamos que pasas la inspección.',
    },
    {
      icon: '💳',
      title: 'Pago Fácil',
      description: 'Aceptamos efectivo, Yape, Plin y transferencias. Emitimos Factura o Boleta.',
    },
    {
      icon: '🛡️',
      title: 'Garantía Real',
      description: 'No desaparecemos. Si algo falla, volvemos y lo arreglamos sin costo.',
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedContainer className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            ¿Por qué elegir a Quilla Electric?
          </h2>
          <p className="text-lg text-brand-dark max-w-2xl mx-auto">
            Somos tu partner confiable en soluciones eléctricas profesionales
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <GlassCard key={benefit.title} delay={index * 0.1} className="p-6 text-center">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-4xl mb-4"
              >
                {benefit.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-brand-black mb-3">
                {benefit.title}
              </h3>
              <p className="text-brand-dark leading-relaxed">
                {benefit.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Glass Contact Form Component
export const GlassContactForm = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <AnimatedContainer className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-brand-dark">
            Estamos listos para ayudarte con tus necesidades eléctricas
          </p>
        </AnimatedContainer>

        <GlassCard className="p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-brand-black font-semibold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  className="glass-input w-full"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="glass-input w-full"
                  placeholder="Tu teléfono"
                />
              </div>
            </div>
            <div>
              <label className="block text-brand-black font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="glass-input w-full"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-brand-black font-semibold mb-2">
                Mensaje
              </label>
              <textarea
                className="glass-textarea w-full"
                placeholder="Describe tu necesidad eléctrica..."
                rows={4}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="glass-btn-primary w-full"
            >
              Enviar Mensaje
            </motion.button>
          </form>
        </GlassCard>
      </div>
    </section>
  );
};

// Glass Footer Component
export const GlassFooter = () => {
  return (
    <footer className="glass-dark-medium mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold text-brand-accent">
                Quilla Electric
              </span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Soluciones eléctricas profesionales en Arequipa. 
              Tu seguridad es nuestra prioridad.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios" className="text-white/80 hover:text-brand-accent transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-brand-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-white/80 hover:text-brand-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contacto
            </h3>
            <div className="space-y-2 text-white/80">
              <p>📞 +51 951 413 458</p>
              <p>📍 Cerro Colorado, Arequipa</p>
              <p>⏰ 24/7 Emergencias</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60">
            © 2024 Quilla Electric. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};