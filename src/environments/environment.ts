// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  WATSON_TEXT_TO_SPEECH_API: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/9b0540ac-3d39-4938-8ba4-96b8e368b55c/v1/synthesize',
  API_KEY: '<PLEASE-PLACE-YOUR-API-KEY-HERE>'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
