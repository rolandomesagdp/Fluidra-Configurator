import { EnvironmentCodeEnum } from './environment.enum';

export interface Environment {
  code: EnvironmentCodeEnum;
  
  poolAssistantUrl: string;
  backOfficeUrl: string;

  auth0: {
    domain: string;
    clientId: string;
  };
}
