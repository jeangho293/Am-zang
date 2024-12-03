import { httpClient, queryKeyMap } from '@libs';
import { CompanyModel } from '@models';
import queryString from 'query-string';

export const companyRepository = {
  async list({ name }: { name?: string }) {
    return httpClient.get<CompanyModel[]>('/companies', {
      params: {
        name,
      },
      paramsSerializer: (param) => queryString.stringify(param),
    });
  },
};

queryKeyMap.set(companyRepository.list, ['Company']);
