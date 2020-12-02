import cloudconfig from './assets/cloudconfig.json'

const config = {
    s3: {
      REGION: cloudconfig.s3region,
      BUCKET: cloudconfig.s3bucket,
    },
    apiGateway: {
      REGION: cloudconfig.apigatewayRegion,
      URL: cloudconfig.apigatewayurl,
    },
    cognito: {
      REGION: cloudconfig.cognitoregion,
      USER_POOL_ID: cloudconfig.userpoolid,
      APP_CLIENT_ID: cloudconfig.appclientid,
      IDENTITY_POOL_ID: cloudconfig.identitypoolid,
    },
  };
  
  export default config;