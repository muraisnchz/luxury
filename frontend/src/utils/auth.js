export const getToken = () => localStorage.getItem('token');

const decodeToken = () => {
    const token = getToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
        return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
        return null;
    }
};

export const getUserRolFromToken = () => decodeToken()?.rol || null;

export const getUserIdFromToken = () => decodeToken()?.id || null;