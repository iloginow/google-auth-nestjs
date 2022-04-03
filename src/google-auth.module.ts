import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigModuleAsync } from './config/config.module.async';
import { GoogleAuthHostModule } from './google-auth-host.module';
import { GoogleAuthService } from './google-auth.service';
import {
  GOOGLE_AUTH_SERVICE_TOKEN,
  GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
} from './config/config.constants';

@Module({
  providers: [
    {
      provide: GoogleAuthService,
      useExisting: GOOGLE_AUTH_SERVICE_TOKEN,
    },
  ],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {
  static forRoot(config: ConfigModule): DynamicModule {
    return {
      module: GoogleAuthModule,
      imports: [GoogleAuthHostModule.forRoot(config)],
    };
  }

  static forRootAsync(config: ConfigModuleAsync): DynamicModule {
    return {
      module: GoogleAuthModule,
      imports: [GoogleAuthHostModule.forRootAsync(config)],
    };
  }

  static forFeature(config: ConfigModule): DynamicModule {
    return this.buildFeature(config);
  }

  static forFeatureAsync(config: ConfigModuleAsync): DynamicModule {
    return this.buildFeature(config);
  }

  private static buildFeature(config: ConfigModule | ConfigModuleAsync) {
    const module: DynamicModule = {
      module: GoogleAuthModule,
      providers: [
        {
          provide: GoogleAuthService,
          inject: [GOOGLE_AUTH_CONFIG_MODULE_TOKEN],
          useFactory: (config: ConfigModule) => {
            return new GoogleAuthService(config);
          },
        },
      ],
    };
    const isSyncConfig = !('useFactory' in config);
    if (isSyncConfig) {
      module.providers = module.providers.concat([
        {
          provide: GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
          useValue: config,
        },
      ]);
    } else {
      const asyncConfig = config as ConfigModuleAsync;
      module.providers = module.providers.concat([
        {
          provide: GOOGLE_AUTH_CONFIG_MODULE_TOKEN,
          useFactory: asyncConfig?.useFactory,
          inject: asyncConfig?.inject,
        },
      ]);
    }
    return module;
  }
}
