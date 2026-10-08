import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from '@/libs/auth-storage';
import { notifyAuthFailure } from '@/services/auth-events';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    withCredentials: true, 
});

// Separate client for refreshing the access token.
// This request will NOT pass through the response interceptor below.
const refreshClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
});

// IMPORTANT: This must be OUTSIDE the interceptors.
let refreshPromise: Promise<string> | null = null;

instance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

/**
 * Refresh access token when a request receives 401.
 */
instance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig & { _retry?: boolean };

    // Not a 401 → don't refresh
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Don't retry the same request forever
    if (originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      /*
       * If another request is already refreshing,
       * wait for that same refresh request.
       *
       * This prevents:
       *
       * Request A → 401 → refresh
       * Request B → 401 → refresh
       * Request C → 401 → refresh
       *
       * from creating three refresh requests.
       */
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken();
      }

      const newAccessToken = await refreshPromise;

      /*
       * Refresh completed successfully.
       * Retry the original request with the new token.
       */
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return instance(originalRequest);
    } catch (refreshError) {
      /*
       * Refresh token is invalid/expired/revoked.
       * User needs to sign in again.
       */
      await removeTokens();
      notifyAuthFailure();

      return Promise.reject(refreshError);
    } finally {
      refreshPromise = null;
    }
  },
);

async function refreshAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await refreshClient.post('/auth/refresh', {
    refreshToken,
  });


  const {
    accessToken,
    refreshToken: newRefreshToken,
  } = response.data;

  if (!accessToken || !newRefreshToken) {
    throw new Error('Invalid refresh response');
  }

  /*
   * IMPORTANT:
   * Because we're rotating refresh tokens,
   * save BOTH tokens.
   */
  await saveTokens(
    accessToken,
    newRefreshToken,
  );

  return accessToken;
}

export default instance