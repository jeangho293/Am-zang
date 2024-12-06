import { Inject, Service } from 'typedi';
import axios, { AxiosInstance } from 'axios';
import { DddContext } from '../ddd';

@Service()
export class StorageClient {
  @Inject()
  context!: DddContext;

  private _httpClient?: AxiosInstance;

  private get httpClient() {
    if (!this._httpClient) {
      this._httpClient = axios.create({
        baseURL: 'http://localhost:4000',
        headers: {
          'x-request-id': this.context.txId,
        },
      });
    }

    this._httpClient.interceptors.response.use((res) => {
      return res.data.data;
    });

    return this._httpClient;
  }

  public api = {
    upload: async (data: any): Promise<{ id: number }> => {
      return this.httpClient.post('/images/upload', data);
    },
  };
}
