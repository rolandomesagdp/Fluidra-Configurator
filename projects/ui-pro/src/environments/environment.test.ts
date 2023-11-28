import { EnvironmentCodeEnum } from "./environment.enum";
import { Environment } from "./environment.interface";


export const environment: Environment = {
   code: EnvironmentCodeEnum.test,
   poolAssistantUrl: "/assets/data/pool-assistant",
   backOfficeUrl: "/assets/data/back-office",
   auth0: {
      domain: 'dev-rqghjdfji7iqdi8f.eu.auth0.com',
      clientId: '0U5CPW69SdJPBQsFZpNugoxLknz6TUXT',
   },
};