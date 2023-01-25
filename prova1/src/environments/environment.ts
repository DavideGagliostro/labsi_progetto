// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  envName: 'local',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8180/auth/',

    // Realm
    realm: 'tasks',

    // The SPA's id. 
    // The SPA is registerd with this id at the auth-serverß
    clientId: 'tasks-ui',
  }
};