import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Database, 
  Settings, 
  Search, 
  Menu, 
  Bell,
  User, 
  Hammer // <--- IMPORTANTE: Importamos el icono del martillo
} from 'lucide-react';

// === IMPORTAMOS TODAS TUS HERRAMIENTAS ===
import SaaSManager from './SaaSManager';       
import ProductManager from './ProductManager'; 
import SuppliesManager from './SuppliesManager'; // <--- El nuevo gestor
import ProductUploader from './ProductUploader'; 
import ConfigManager from './ConfigManager';   
import LeadsManager from './LeadsManager';     
import LogoutButton from './LogoutButton';

export default function AdminDashboard() {
  // Estado para la navegación y menú móvil
  const [activeTab, setActiveTab] = useState('inventory');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CONFIGURACIÓN DEL MENÚ LATERAL
  // Agregué 'Insumos' aquí para que se genere automáticamente con el mismo diseño
  const menuItems = [
    { 
      id: 'inventory', 
      label: 'Inventario CCTV', 
      icon: Package, 
      description: 'Cámaras y equipos de venta' 
    },
    { 
      id: 'supplies', // <--- NUEVA PESTAÑA INTEGRADA
      label: 'Insumos & Materiales', 
      icon: Hammer, 
      description: 'Tubos, cables y ferretería' 
    },
    { 
      id: 'crm', 
      label: 'Clientes (CRM)', 
      icon: User, 
      description: 'Prospectos y cotizaciones' 
    },
    { 
      id: 'saas', 
      label: 'Control SaaS', 
      icon: LayoutDashboard, 
      description: 'Configuración global' 
    },
    { 
      id: 'data', 
      label: 'Base de Datos', 
      icon: Database, 
      description: 'Backup y utilidades' 
    }
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans">
      
      {/* =========================================================
          1. SIDEBAR (PANEL LATERAL IZQUIERDO)
         ========================================================= */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* LOGO / HEADER */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-900/20">
                    Q
                </div>
                <div>
                    <h1 className="font-bold text-lg tracking-tight leading-none">Quilla<span className="text-blue-500">OS</span></h1>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">Panel Admin v2.3</p>
                </div>
            </div>
        </div>

        {/* LISTA DE NAVEGACIÓN */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-180px)]">
            <p className="px-4 text-xs font-bold text-slate-500 uppercase mb-2 mt-2">Menú Principal</p>
            
            {/* Generación automática de botones del menú */}
            {menuItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium ${
                        activeTab === item.id 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                    <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'} />
                    <div className="text-left">
                        <div className="font-semibold">{item.label}</div>
                        {/* Descripción pequeña solo en desktop para no saturar */}
                        <div className="hidden md:block text-[10px] opacity-60 font-normal">{item.description}</div>
                    </div>
                    
                    {item.id === 'crm' && (
                        <span className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    )}
                </button>
            ))}

            <p className="px-4 text-xs font-bold text-slate-500 uppercase mb-2 mt-6">Sistema</p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-sm font-medium">
                <Settings size={20} className="text-slate-500" />
                Ajustes Generales
            </button>
        </nav>

        {/* FOOTER DEL SIDEBAR */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 bg-slate-900">
            <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 border border-slate-500"></div>
                <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">Administrador</p>
                    <p className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> En Línea
                    </p>
                </div>
            </div>
            <LogoutButton />
        </div>
      </aside>


      {/* =========================================================
          2. ÁREA PRINCIPAL (DERECHA)
         ========================================================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-950 relative">
        
        {/* BARRA SUPERIOR */}
        <header className="h-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
            
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-400 hover:text-white">
                    <Menu />
                </button>

                {/* Título Dinámico según la pestaña activa */}
                <div>
                    <h2 className="text-xl font-bold text-white capitalize flex items-center gap-2">
                        {menuItems.find(i => i.id === activeTab)?.icon && React.createElement(menuItems.find(i => i.id === activeTab).icon, { size: 24, className: "text-blue-500" })}
                        {menuItems.find(i => i.id === activeTab)?.label}
                    </h2>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                    <input type="text" placeholder="Buscar..." className="bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 w-64 text-slate-300 transition-all focus:w-80" />
                </div>
                <button className="p-2 text-slate-400 hover:text-white relative bg-slate-900 rounded-full border border-slate-800 hover:border-slate-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                </button>
            </div>
        </header>


        {/* CONTENIDO DINÁMICO */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto animate-fadeIn pb-20">
                
                {/* 1. INVENTARIO */}
                {activeTab === 'inventory' && <ProductManager />}

                {/* 2. INSUMOS (NUEVO) */}
                {activeTab === 'supplies' && <SuppliesManager />}

                {/* 3. CRM */}
                {activeTab === 'crm' && <LeadsManager />}
                
                {/* 4. CONTROL SAAS */}
                {activeTab === 'saas' && (
                    <div className="space-y-8">
                        <ConfigManager />
                        <div className="opacity-75">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="h-px bg-slate-800 flex-1"></span>
                                <span className="text-xs text-slate-500 uppercase font-bold">Herramientas Legacy</span>
                                <span className="h-px bg-slate-800 flex-1"></span>
                            </div>
                            <SaaSManager />
                        </div>
                    </div>
                )}
                
                {/* 5. BASE DE DATOS */}
                {activeTab === 'data' && <ProductUploader />}
                
            </div>
        </div>

      </main>

      {/* OVERLAY MÓVIL */}
      {isMobileMenuOpen && (
        <div 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
        ></div>
      )}

    </div>
  );
}