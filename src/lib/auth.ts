export const saveToken = (token: string) => localStorage.setItem("token", token);
export const getToken = (): string | null =>
  typeof window !== "undefined" ? localStorage.getItem("token") : null;
export const removeToken = () => localStorage.removeItem("token");
