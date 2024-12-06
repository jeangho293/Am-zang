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

  instance.interceptors.response.use(
    (res) => {
      return res.data.data;
    },
    (err) => Promise.reject(err)
  );

  return {
    setAuthorization(accessToken: string) {
      authorization = accessToken;
    },
    async post<T>(
      url: string,
      data: Record<string, any>,
      options?: { headers?: Record<string, any> }
    ): Promise<T> {
      return instance.post(url, data, options);
    },
    async get<T>(
      url: string,
      options?: {
        params?: Record<string, any>;
        paramsSerializer?: (param: Record<string, any>) => any;
      }
    ): Promise<T> {
      return instance.get(url, options);
    },
  };
})();
