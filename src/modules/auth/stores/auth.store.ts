import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AuthStatus, type UserAuth } from '../interfaces';
import { loginAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<UserAuth | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (username: string, password: string) => {
    try {
      const loginResp = await loginAction(username, password);
      if (!loginResp.ok) {
        logout();
        return false;
      }
      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const logout = () => {
    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.Unauthenticated;
    return false;
  };

  logout();

  return {
    user,
    token,
    authStatus,
    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    // Actions
    login,
    logout,
  };
});
