import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { accessToken } = useSelector((state) => state.auth);
    const token = accessToken || localStorage.getItem('accessToken');
    return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
