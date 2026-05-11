export const getToken = () => localStorage.getItem('token');

export const getUserRolFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    try {
        const payload = parts[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded.rol || null;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};