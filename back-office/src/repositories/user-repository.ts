import { httpClient, queryKeyMap } from '../libs';
import type { UserModel } from '../models';

export const userRepository = {
  async list() {
    return httpClient.get<UserModel[]>('/users');
  },
};

queryKeyMap.set(userRepository.list, ['User']);
