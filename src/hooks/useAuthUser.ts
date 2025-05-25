import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string; 
  email: string;
  username: string;
  exp: number;
  iat: number;
}
/// Hook para decodificar o token JWT e obter informações do usuário
// O hook também fornece uma função de logout para remover o token do localStorage
// e redirecionar o usuário para a página de login
// O hook usa o hook useMemo do React para memorizar o valor decodificado do token
// e evitar cálculos desnecessários em renderizações subsequentes
 // O hook também verifica se o token expirou antes de retornar as informações do usuário

export function useAuthUser() {
  const token = localStorage.getItem("jwtToken");

  const decoded = useMemo<DecodedToken | null>(() => {
    if (!token) return null;

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);

      // Verifica se o token expirou
      const isExpired = decodedToken.exp * 1000 < Date.now();
      if (isExpired) {
        console.warn("Token expirado.");
        return null;
      }

      return decodedToken;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }, [token]);

  // Função de logout
  const logout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/"; // redireciona para a página de login
  };

  // redirecionar para perfil ou transações - colocando aqui temporariamente mas onde isso deve estar?
  const profile = () => {
    window.location.href = "/perfil"
  }
  const transactions = () => {
    window.location.href = "/transacao"
  }

  return {
    userId: decoded?.sub ?? null,
    email: decoded?.email ?? null,
    username: decoded?.username ?? null,
    isAuthenticated: !!decoded,
    logout,
    profile,
    transactions
  };
}
