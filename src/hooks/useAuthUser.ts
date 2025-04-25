import { useMemo } from "react";

export interface DecodedToken {
  sub: string; 
  email: string;
  username: string;
  exp: number;
  iat: number;
}

export function useAuthUser() {
  const token = localStorage.getItem("jwtToken");

  const decoded = useMemo<DecodedToken | null>(() => {
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload as DecodedToken;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }, [token]);

  return {
    userId: decoded?.sub ?? null,
    email: decoded?.email ?? null,
    username: decoded?.username ?? null,
    isAuthenticated: !!decoded,
  };
}
