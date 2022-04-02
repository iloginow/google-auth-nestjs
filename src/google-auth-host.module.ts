import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigModuleAsync } from './config/config.module.async';
import {
  GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
  GOOGLE_AUTH_SERVICE_TOKEN,
} from './config/config.constants';
import { GoogleAuthService } from './google-auth.service';

@Global()
@Module({
  providers: [
    {
      provide: GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
      useValue: null,
    },
    {
      provide: GOOGLE_AUTH_SERVICE_TOKEN,
      useClass: GoogleAuthService,
    },
  ],
  exports: [GOOGLE_AUTH_SERVICE_TOKEN],
})
export class GoogleAuthHostModule {
  static forRoot(config: ConfigModule): DynamicModule {
    return {
      module: GoogleAuthHostModule,
      providers: [
        {
          provide: GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
          useValue: config,
        },
      ],
    };
  }

  static forRootAsync(config: ConfigModuleAsync): DynamicModule {
    return {
      module: GoogleAuthHostModule,
      imports: config.imports,
      providers: [
        {
          provide: GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
          useFactory: config?.useFactory,
          inject: config?.inject,
        },
      ],
    };
  }
}
