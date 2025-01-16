import apiDyV from '@/api/apiDyV';
import type { AuthResponse, UserAuth } from '../interfaces';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSucces {
  ok: true;
  token: string;
  refresh: string;
  user: UserAuth;
}

export const loginAction = async (
  username: string,
  password: string,
): Promise<LoginError | LoginSucces> => {
  try {
    const { data } = await apiDyV.post<AuthResponse>('/login-jwt/', { username, password });
    return {
      ok: true,
      token: data.access,
      refresh: data.refresh,
      user: data.user,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o Contraseña incorrecta',
      };
    }
    throw new Error('No se pudo realizar la petición');
  }
};
