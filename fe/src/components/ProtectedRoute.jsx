import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { accessToken, user } = useSelector((state) => state.auth);
    const token = accessToken || localStorage.getItem('accessToken');
    
    if (!token) {
        return <Navigate to="/" replace />;
    }
    
    const storedUser = localStorage.getItem('user');
    const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);
    
    if (allowedRoles && currentUser) {
        const userRole = currentUser.role?.toUpperCase();
        const upperAllowedRoles = allowedRoles.map(r => r.toUpperCase());
        
        if (!upperAllowedRoles.includes(userRole)) {
            // Redirect based on user's actual role
            if (userRole === 'STUDENT') {
                return <Navigate to="/student/dashboard" replace />;
            }
            if (userRole === 'GUARDIAN') {
                return <Navigate to="/guardian/dashboard" replace />;
            }
            if (userRole === 'TRANSPORT' || userRole === 'TRANSPORT_INCHARGE') {
                return <Navigate to="/transport/dashboard" replace />;
            }
            if (['LECTURER', 'CLASS_TEACHER', 'HEAD_OF_DEPARTMENT', 'STAFF'].includes(userRole)) {
                return <Navigate to="/staff/dashboard" replace />;
            }
            if (['PRINCIPAL', 'ADMINISTRATOR'].includes(userRole)) {
                return <Navigate to="/principal/dashboard" replace />;
            }
            return <Navigate to="/" replace />;
        }
    }
    
    return children;
};

export default ProtectedRoute;
