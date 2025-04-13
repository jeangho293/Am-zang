import { httpClient } from '@libs/http-client';
import { queryKeyMap } from '@libs/react-query';

export const verificationRepository = {
  async sendCode({ email }: { email: string }) {
    return httpClient.post('/verifications', { email });
  },
};

queryKeyMap.set(verificationRepository.sendCode, ['Verification']);
