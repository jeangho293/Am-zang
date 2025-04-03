import { httpClient } from '@libs/http-client';
import { GymModel } from '../models';
import { queryKeyMap } from '@libs/react-query';

export const gymRepository = {
  async list() {
    return httpClient.get<GymModel[]>('/gyms');
  },
};

queryKeyMap.set(gymRepository.list, ['Gym']);
