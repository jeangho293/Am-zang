import axios from 'axios';

export const httpClient = (() => {
  let authorization: string;

  const instance = axios.create({
    baseURL: 'http://localhost:3000/admins',
    headers: {
      Authorization: '',
    },
  });

  instance.interceptors.request.use((config) => {
    if (authorization) {
      config.headers.Authorization = `Bearer ${authorization}`;
    }
    return config;
  });

  return {
    setAuthorization(accessToken: string) {
      authorization = accessToken;
    },
    async post<T>(url: string, data: Record<string, any>): Promise<T> {
      return instance.post(url, data);
    },
    async get<T>(url: string): Promise<T> {
      return instance.get(url);
    },
  };
})();
