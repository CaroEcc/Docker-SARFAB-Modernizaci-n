export const useLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    window.location.href = '/auth/signin';
};