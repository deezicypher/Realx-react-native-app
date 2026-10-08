// lib/auth-storage.ts

import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'ginchi';
const REFRESH_TOKEN_KEY = 'ginchi_refresh';

export async function saveTokens(accessToken: string, refreshToken:string) {
  await Promise.all([SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken),
     SecureStore.setItemAsync(REFRESH_TOKEN_KEY,refreshToken)
  ]);
}


export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(){
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

export async function removeTokens() {
  await Promise.all([SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)])
}

