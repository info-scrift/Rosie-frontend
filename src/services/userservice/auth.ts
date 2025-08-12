// services/auth.ts

export const saveAuthTokens = (
    accessToken: string,
    refreshToken: string,
    user: { role: string } // Add more fields if needed
  ) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("role", user.role);
  };
  
  export const getAccessToken = () => {
    return localStorage.getItem("access_token");
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem("refresh_token");
  };
  
  export const getUserRole = () => {
    return localStorage.getItem("role");
  };
  
  export const clearAuthTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  };
  