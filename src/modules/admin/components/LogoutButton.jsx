import React from 'react';
import { logout } from '@modules/auth/store/authStore';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  return (
    <button 
        // Importante: No uses onClick={() => logout()} si logout es async,
        // mejor pásalo directo o manéjalo así:
        onClick={async () => {
            await logout();
        }}
        type="button" // <--- Importante para que no intente enviar formularios
        className="w-full flex items-center justify-center gap-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 py-2 rounded-lg transition-colors cursor-pointer font-bold"
    >
        <LogOut size={14} />
        Cerrar Sesión
    </button>
  );
}