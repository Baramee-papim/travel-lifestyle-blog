import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthUser } from "../types/auth";

const STORAGE_TOKEN = "travel_blog_access_token";
const STORAGE_USER = "travel_blog_user";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthReady: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string) => Promise<void>;
  logout: () => void;
  updateAuthUser: (nextUser: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchCurrentUser(accessToken: string): Promise<AuthUser> {
  const base = import.meta.env.VITE_API_BASE_URL;
  const { data } = await axios.get<AuthUser>(`${base}/api/auth/get-user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    setUser(null);
    setToken(null);
  }, []);

  const updateAuthUser = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_USER, JSON.stringify(nextUser));
  }, []);

  const login = useCallback(async (accessToken: string) => {
    const profile = await fetchCurrentUser(accessToken);
    localStorage.setItem(STORAGE_TOKEN, accessToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(profile));
    setToken(accessToken);
    setUser(profile);
  }, []);

  useEffect(() => {
    const init = async () => {
      const storedToken = localStorage.getItem(STORAGE_TOKEN);
      if (!storedToken) {
        setIsAuthReady(true);
        return;
      }

      setToken(storedToken);
      const cached = localStorage.getItem(STORAGE_USER);
      if (cached) {
        try {
          setUser(JSON.parse(cached) as AuthUser);
        } catch {
          /* ignore corrupt cache */
        }
      }

      try {
        const profile = await fetchCurrentUser(storedToken);
        setUser(profile);
        localStorage.setItem(STORAGE_USER, JSON.stringify(profile));
      } catch {
        logout();
      } finally {
        setIsAuthReady(true);
      }
    };

    void init();
  }, [logout]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthReady,
      isAuthenticated: Boolean(user && token),
      login,
      logout,
      updateAuthUser,
    }),
    [user, token, isAuthReady, login, logout, updateAuthUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
