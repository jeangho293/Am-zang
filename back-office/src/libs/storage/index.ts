import { useCallback, useState } from 'react';
import { httpClient } from '../http-client';

const storageClient = httpClient;

export const useFileUpload = (): [(file: File) => Promise<void>, { loading: boolean }] => {
  const [loading, setLoading] = useState(false);
  return [
    useCallback(async (file: File) => {
      setLoading(true);
      const response = await storageClient.post<void>(
        '/storages',
        { file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    }, []),
    { loading },
  ];
};
