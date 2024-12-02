import { httpClient, queryKeyMap } from '../libs';
import type { UserModel } from '../models';
import querystring from 'query-string';

export const userRepository = {
  async list({ email }: { email?: string }) {
    return httpClient.get<UserModel[]>('/users', {
      params: {
        email,
      },
      paramsSerializer: (param) => querystring.stringify(param),
    });
  },
};

queryKeyMap.set(userRepository.list, ['User']);
