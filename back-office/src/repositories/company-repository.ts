import { httpClient, queryKeyMap } from '@libs';
import { CompanyModel } from '@models';
import queryString from 'query-string';

export const companyRepository = {
  async add({
    name,
    email,
    address,
    phoneNumber,
  }: {
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
  }) {
    return httpClient.post('/companies', { name, email, address, phoneNumber });
  },

  async list({ name }: { name?: string }) {
    return httpClient.get<CompanyModel[]>('/companies', {
      params: {
        name,
      },
      paramsSerializer: (param) => queryString.stringify(param),
    });
  },
};

queryKeyMap.set(companyRepository.add, ['Company']);
queryKeyMap.set(companyRepository.list, ['Company']);
