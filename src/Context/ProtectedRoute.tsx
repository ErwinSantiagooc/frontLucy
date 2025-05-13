import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'cliente';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { currentUser, isAdmin, isCliente, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!currentUser) {
    return <Navigate to="login" />;
  }

  // Verificar el rol requerido si se especifica uno
  if (requiredRole) {
    if (
      (requiredRole === 'admin' && !isAdmin()) ||
      (requiredRole === 'cliente' && !isCliente())
    ) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;