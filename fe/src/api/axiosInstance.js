import axios from 'axios';

// Holds the Redux store reference — injected from main.jsx to avoid circular deps.
let store;
export const injectStore = (_store) => { store = _store; };

const axiosInstance = axios.create({ baseURL: '/' });

// ── Request: attach access token ─────────────────────────────────────────────
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ── Response: silent token refresh on 401 ────────────────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;
        const status = error.response?.status;

        // Only attempt refresh on 401 or 403 (expired/invalid token)
        if ((status !== 401 && status !== 403) || original._retry) {
            return Promise.reject(error);
        }

        // Don't retry refresh/login calls themselves
        if (original.url?.includes('/api/auth/')) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            // Queue concurrent requests while refresh is in flight.
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                original.headers.Authorization = `Bearer ${token}`;
                return axiosInstance(original);
            });
        }

        original._retry = true;
        isRefreshing = true;
        console.log('[Auth] Access token expired. Attempting silent refresh...');

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            isRefreshing = false;
            store?.dispatch({ type: 'LOGOUT' });
            return Promise.reject(error);
        }

        try {
            // Use plain axios (no interceptors) to avoid infinite loops.
            // Using a relative URL will route correctly through Vite's proxy and avoid CORS/host issues.
            const { data } = await axios.post('/api/auth/refresh', { refreshToken });
            console.log('[Auth] Token refreshed successfully.');
            
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            
            // Sync with Redux store
            store?.dispatch({
                type: 'REFRESH_TOKEN_SUCCESS',
                payload: {
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                }
            });

            processQueue(null, data.accessToken);
            original.headers.Authorization = `Bearer ${data.accessToken}`;
            return axiosInstance(original);
        } catch (refreshError) {
            console.error('[Auth] Refresh failed. Logging out.', refreshError);
            processQueue(refreshError, null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            store?.dispatch({ type: 'LOGOUT' });
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default axiosInstance;
