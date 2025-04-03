import { httpClient } from '@libs/http-client';
import { GymModel } from '../models';
import { queryKeyMap } from '@libs/react-query';
import queryString from 'query-string';

export const gymRepository = {
  async list({ page, limit }: { page?: number; limit?: number }) {
    return httpClient.get<Promise<{ items: GymModel[]; count: number }>>('/gyms', {
      params: {
        page,
        limit,
      },
      paramsSerializer: (params) => queryString.stringify(params),
    });
  },

  async add({
    name,
    phoneNumber,
    address1,
    address2,
  }: {
    name: string;
    phoneNumber: string;
    address1: string;
    address2: string;
  }) {
    return httpClient.post<Promise<void>>('/gyms', { name, phoneNumber, address1, address2 });
  },
};

queryKeyMap.set(gymRepository.list, ['Gym']);
queryKeyMap.set(gymRepository.add, ['Gym']);
