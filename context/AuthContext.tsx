import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getAccessToken, removeAccessToken } from '@/libs/auth-storage';
import instance from '@/services/api';

type User = {
  id: string;
  name: string;
  email: string;
  photo: string | null;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = await getAccessToken();

      if (!token) {
        setUser(null);
        return;
      }

      const response = await instance.get('/auth/profile');

      setUser(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to restore session:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });

      
        await removeAccessToken();
        
      } else {
        console.error('Failed to restore session:', error);
      }

      setUser(null);
    }
  };

  const logout = async () => {
    await removeAccessToken();
    setUser(null);
  };

  const isLoggedIn = !!user

  useEffect(() => {
    const restoreSession = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}