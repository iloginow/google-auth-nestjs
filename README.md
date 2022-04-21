# google-auth-nestjs

## Description
Google login package for NestJs

## Instalation
```yarn add google-auth-nestjs```

## Quick Start


1. Create your Google app and get your credentials (clientId and clientSecret) from Google Cloud panel.

2. Import <b>GoogleAuthModule</b> on your NestJs module and use <b>forRoot</b> or <b>forRootAsync</b> static methods for initial configuration <i>(configure using your clientId and clientSecret from Google Cloud panel)</i>. 
``` js
import { GoogleAuthModule } from 'google-auth-nestjs';

@Module({
  imports: [
    GoogleAuthModule.forRoot({
      clientId: 'your-google-clientid',
      clientSecret: 'your-google-client-secret',
    }),
  ],
})
export class AppModule { }
```

3. Import <b>GoogleAuthService</b> on your service or controller and use <b>getUserData</b> method to get user's information from Google.
``` js
import { GoogleAuthService } from 'google-auth-nestjs';

@Injectable()
export class AppService {

  constructor(private readonly service: GoogleAuthService) { }
  
  async getGoogleUser(accessToken: string): Promise<GoogleUserData> {
    return await this.service.getUserData(accessToken);
  }
}
```

- To call <b>getUserData</b> method you have to pass the accessToken (sent from front-end login method).
