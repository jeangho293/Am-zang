import { useCallback, useState } from 'react';
import { httpClient } from '../http-client';

const storageClient = httpClient;

export const useFileUpload = (): [
  (file: File) => Promise<{ id: number }>,
  { loading: boolean },
] => {
  const [loading, setLoading] = useState(false);

  return [
    useCallback(async (file: File) => {
      setLoading(true);
      const { id } = await storageClient.post<{ id: number }>(
        '/storages',
        { file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return { id };
    }, []),
    { loading },
  ];
};
