import { Inject, Service } from 'typedi';
import axios, { AxiosInstance } from 'axios';
import { DddContext } from '../ddd';

@Service()
export class GoogleClient {
  @Inject()
  context!: DddContext;

  private _httpClient?: AxiosInstance;

  private get httpClient() {
    if (!this._httpClient) {
      this._httpClient = axios.create({
        baseURL: `https://www.googleapis.com`,
      });
    }

    this._httpClient.interceptors.response.use((res) => {
      return res.data;
    });

    return this._httpClient;
  }

  public google = {
    signIn: async (accessToken: string): Promise<{ id: string; email: string }> => {
      return this.httpClient.get(`/oauth2/v1/userinfo?access_token=${accessToken}`);
    },
  };
}
