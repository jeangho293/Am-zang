import axios from 'axios';

export const httpClient = (() => {
  let authorization = '';

  const instance = axios.create({
    baseURL: `http://localhost:3000/general`,
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
    setAuthorization(token: string) {
      authorization = token;
    },
    async get<T>(url: string): Promise<T> {
      return instance.get(url);
    },
    async post<T>(url: string, data: Record<string, any>): Promise<T> {
      return instance.post(url, data);
    },
  };
})();
