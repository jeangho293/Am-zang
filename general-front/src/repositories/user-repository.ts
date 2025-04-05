import { httpClient } from '@libs/http-client';
import { queryKeyMap } from '@libs/react-query';

export const userRepository = {
  async checkEmail({ email }: { email: string }) {
    return httpClient.post<Promise<boolean>>('/users/check', { email });
  },

  async signUp({
    email,
    password,
    confirmPassword,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return httpClient.post<Promise<void>>('/users/sign-up', { email, password, confirmPassword });
  },
};

queryKeyMap.set(userRepository.checkEmail, ['User']);
queryKeyMap.set(userRepository.signUp, ['User']);
