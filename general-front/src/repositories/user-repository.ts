import { httpClient } from '../libs/http-client';
import { queryKeyMap } from '../libs/react-query';

export const userRepository = {
  async signIn({ email, password }: { email: string; password: string }) {
    return httpClient.post('/auth', { email, password });
  },
};

queryKeyMap.set(userRepository.signIn, ['User']);
