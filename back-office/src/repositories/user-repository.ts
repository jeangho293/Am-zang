import { httpClient } from '@libs/http-client';
import { UserModel } from '@models';
import { queryKeyMap } from '../libs/react-query';

export const usersRepository = {
  async list() {
    return httpClient.get<{ items: UserModel[]; count: number }>('/users');
  },
};

queryKeyMap.set(usersRepository.list, ['User']);
