import axios from 'axios';

export const httpClient = (() => {
  let _authorization = '';

  const instance = axios.create({
    baseURL: 'http://localhost:3000/generals',
    headers: {
      Authorization: '',
    },
  });

  instance.interceptors.request.use((config) => {
    if (_authorization) {
      config.headers.Authorization = `Bearer ${_authorization}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      return res.data.data;
    },
    (err) => {
      return Promise.reject(err.response.data);
    }
  );

  return {
    setAuthorization(accessToken: string) {
      _authorization = accessToken;
    },
    async post<T>(url: string, data: Record<string, any>): Promise<T> {
      return instance.post(url, data);
    },
    async get<T>(
      url: string,
      options?: {
        params?: any;
        paramsSerializer?: (param: Record<string, any>) => any;
      }
    ): Promise<T> {
      return instance.get(url, options);
    },
  };
})();
