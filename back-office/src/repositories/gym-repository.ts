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

// Gym은 Company의 ManyToOne관계이므로 queryKey를 company로 했다.
queryKeyMap.set(gymRepository.add, ['Company']);
