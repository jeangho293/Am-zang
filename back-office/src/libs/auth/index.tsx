import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { UserModel } from '@models';
import { CircularProgress } from '@mui/material';
import { httpClient } from '../http-client';

const authClient = httpClient;

const UserContext = createContext<{
  getUser: () => UserModel | undefined;
  setUser: (user?: UserModel) => void;
}>({
  getUser() {
    return undefined;
  },
  setUser() {},
});

async function loadToken(query: () => Promise<{ accessToken: string }>) {
  const { accessToken } = await query();

  if (accessToken) {
    authClient.setAuthorization(accessToken);
    localStorage.setItem('token', accessToken);
  }

  return !!accessToken;
}

async function unLoadToken() {
  localStorage.removeItem('token');
}

async function getSelf() {
  return httpClient.get<UserModel>('/users/self');
}

export function AuthProvider(props: { initialUser?: UserModel; children: ReactNode }) {
  // 1. destructure props
  const { initialUser, children } = props;

  // 2. lib hooks
  // 3. state hooks
  const [initialized, setInitialized] = useState(!!initialUser);
  const [user, setUser] = useState(initialUser);

  // 4. query hooks
  // 5. form hooks
  // 6. calculate values
  const context = useMemo(
    () => ({
      getUser() {
        return user;
      },
      setUser(user?: UserModel) {
        setUser(user);
      },
    }),
    [user]
  );

  // 7. effect hooks
  useEffect(() => {
    if (!initialized) {
      loadToken(() => Promise.resolve({ accessToken: localStorage.getItem('token') || '' }))
        .then(async (isToken) => {
          if (isToken) {
            context.setUser(await getSelf());
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setInitialized(true));
    }
  }, [initialized]);

  // 8. handlers

  return !initialized ? (
    <CircularProgress />
  ) : (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export function useGoogleSignIn(): [(accessToken: string) => void, { loading: boolean }] {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return [
    useCallback(
      (accessToken: string) => {
        setLoading(true);
        loadToken(() => authClient.post('/auth/google', { accessToken }))
          .then(async () => context.setUser(await getSelf()))
          .catch((err) => console.log(err))
          .finally(() => setLoading(false));
      },
      [context]
    ),
    { loading },
  ];
}

export function useSignOut(): [() => void, { loading: boolean }] {
  const context = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  return [
    useCallback(() => {
      setLoading(true);
      unLoadToken()
        .then(() => context.setUser())
        .finally(() => setLoading(false));
    }, [context]),
    { loading },
  ];
}

export function useUser() {
  const context = useContext(UserContext);
  const user = context.getUser();

  return [user!];
}
