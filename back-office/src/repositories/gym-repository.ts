import { httpClient, queryKeyMap } from '@libs';

export const gymRepository = {
  async add({
    branchOffice,
    address,
    createdOn,
    companyId,
  }: {
    branchOffice: string;
    address: string;
    createdOn: string;
    companyId: number;
  }) {
    return httpClient.post<void>(`/companies/${companyId}/gyms`, {
      branchOffice,
      address,
      createdOn,
    });
  },
};

queryKeyMap.set(gymRepository.add, ['Gym']);
