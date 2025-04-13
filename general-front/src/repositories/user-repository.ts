import { httpClient } from '@libs/http-client';
import { queryKeyMap } from '@libs/react-query';

export const userRepository = {
  async signUp({
    email,
    code,
    password,
    confirmPassword,
  }: {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
  }) {
    return httpClient.post('/users/sign-up', { email, code, password, confirmPassword });
  },
};

queryKeyMap.set(userRepository.signUp, ['User']);
