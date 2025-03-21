import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigsService } from '@configs';

@Injectable()
export class GoogleClient {
  private googleClient: OAuth2Client;

  private clientId: string;

  constructor(private readonly configsService: ConfigsService) {
    this.clientId = this.configsService.googleAuth.clientId!;
    this.googleClient = new OAuth2Client({ clientId: this.clientId });
  }

  async verifyIdToken({ idToken }: { idToken: string }) {
    const loginTicket = await this.googleClient.verifyIdToken({
      idToken,
      audience: this.clientId,
    });

    const payload = loginTicket.getPayload();

    if (!payload) {
      throw new UnauthorizedException(`google idToken payload is empty.`, {
        cause: 'google idToken payload is empty.',
      });
    }

    return payload;
  }
}
