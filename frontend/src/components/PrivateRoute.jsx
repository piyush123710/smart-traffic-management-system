import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-primary-500">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and user does not have it
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />; // Send back to dashboard
  }

  return children;
};

export default PrivateRoute;
