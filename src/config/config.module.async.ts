import { FactoryProvider, ModuleMetadata } from '@nestjs/common/interfaces';
import { ConfigModule } from './config.module';

export interface ConfigModuleAsync
  extends Pick<ModuleMetadata, 'imports'>,
    Pick<FactoryProvider, 'inject'> {
  useFactory: (...args: any[]) => Promise<ConfigModule> | ConfigModule;
}
