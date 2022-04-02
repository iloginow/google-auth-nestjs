import { Inject, Injectable } from '@nestjs/common';
import { GOOGLE_AUTH_CONFIG_MODULE_TOKEN } from './config/config.constants';
import { google, Auth } from 'googleapis';
import { ConfigModule } from './config/config.module';
import { UserData } from './types/user-data.type';

@Injectable()
export class GoogleAuthService {
  oauthClient: Auth.OAuth2Client;
  constructor(
    @Inject(GOOGLE_AUTH_CONFIG_MODULE_TOKEN)
    private readonly configModule: ConfigModule,
  ) {
    this.oauthClient = new google.auth.OAuth2(
      this.configModule.clientId,
      this.configModule.clientSecret,
    );
  }

  async getUserData(token: string): Promise<UserData> {
    const userInfoClient = google.oauth2('v2').userinfo;
    this.oauthClient.setCredentials({
      access_token: token,
    });
    const userInfoResponse = await userInfoClient.get({
      auth: this.oauthClient,
    });
    return userInfoResponse.data;
  }
}
