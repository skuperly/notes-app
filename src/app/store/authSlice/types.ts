export interface IAuthState {
  isLoading: boolean;
  error: string | null;
  user: {
    username: string;
    email: string;
  } | null;
}
