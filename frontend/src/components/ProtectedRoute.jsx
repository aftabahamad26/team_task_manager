import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && userInfo.role !== 'admin' && userInfo.role !== 'Admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;
