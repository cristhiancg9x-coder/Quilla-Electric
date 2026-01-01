// Example Next.js page implementation using the Glassmorphism UI System

import { 
  GlassNavigation, 
  GlassHero, 
  GlassServiceCard, 
  GlassBenefitsGrid, 
  GlassContactForm, 
  GlassFooter 
} from '../glassmorphism-ui-system/components';
import { PageTransition, StaggerGrid } from '../glassmorphism-ui-system/animations';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quilla Electric - Soluciones Eléctricas en Arequipa',
  description: 'Servicios eléctricos profesionales en Arequipa. Pozos a tierra, certificaciones INDECI y emergencias 24/7.',
};

export default function HomePage() {
  const services = [
    {
      icon: '🏗️',
      title: 'Pozos a Tierra',
      description: 'Instalación y certificación de pozos a tierra según normas INDECI',
      href: '/servicios/pozos-a-tierra',
    },
    {
      icon: '🔌',
      title: 'Cableado Eléctrico',
      description: 'Instalación de cableado residencial e industrial con garantía',
      href: '/servicios/cableado-electrico',
    },
    {
      icon: '🛡️',
      title: 'Protección Eléctrica',
      description: 'Instalación de diferenciales, termicas y dispositivos de seguridad',
      href: '/servicios/proteccion-electrica',
    },
    {
      icon: '📹',
      title: 'Cámaras de Seguridad',
      description: 'Instalación de sistemas de vigilancia y cámaras de seguridad',
      href: '/servicios/camaras-seguridad',
    },
    {
      icon: '💡',
      title: 'Iluminación LED',
      description: 'Instalación de sistemas de iluminación LED eficientes',
      href: '/servicios/iluminacion-led',
    },
    {
      icon: '🚨',
      title: 'Emergencias 24/7',
      description: 'Atención de emergencias eléctricas las 24 horas del día',
      href: '/servicios/emergencias',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray to-white">
      <GlassNavigation />
      
      <main>
        <GlassHero />
        
        <PageTransition>
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
                  Nuestros Servicios
                </h2>
                <p className="text-lg text-brand-dark max-w-2xl mx-auto">
                  Soluciones eléctricas completas para tu hogar o negocio
                </p>
              </div>
              
              <StaggerGrid cols={1} md:cols={2} lg:cols={3}>
                {services.map((service, index) => (
                  <GlassServiceCard
                    key={service.title}
                    {...service}
                    delay={index * 0.1}
                  />
                ))}
              </StaggerGrid>
            </div>
          </section>
        </PageTransition>
        
        <GlassBenefitsGrid />
        <GlassContactForm />
      </main>
      
      <GlassFooter />
    </div>
  );
}

// Example services page
export function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray to-white">
      <GlassNavigation />
      
      <PageTransition>
        <main className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
                Nuestros Servicios
              </h1>
              <p className="text-xl text-brand-dark">
                Soluciones eléctricas profesionales y certificadas
              </p>
            </div>
            
            <StaggerGrid cols={1} md:cols={2}>
              {/* Service cards here */}
            </StaggerGrid>
          </div>
        </main>
      </PageTransition>
      
      <GlassFooter />
    </div>
  );
}

// Example contact page
export function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray to-white">
      <GlassNavigation />
      
      <PageTransition>
        <main className="pt-32 pb-20">
          <GlassContactForm />
        </main>
      </PageTransition>
      
      <GlassFooter />
    </div>
  );
}