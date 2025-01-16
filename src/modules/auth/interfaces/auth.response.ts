import type { UserAuth } from './userAuth.interface';

export interface AuthResponse {
  refresh: string;
  access: string;
  user: UserAuth;
}
