import { createContext, useContext } from 'react';

export const AuthContext = createContext<
  | {
      confirmAuth: () => void;
      invalidateAuth: () => void;
      getLocalStorageAuthValue: () => boolean;
    }
  | undefined
>(undefined);

export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error('AuthProvider is not used anywhere in the code');
  }

  return authContext;
}
