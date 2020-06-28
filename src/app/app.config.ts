import { InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<string>('app.config');

export interface IAppConfig {
  apiEndpoint: string;
  apiSettingsPath: string;
  BaseURL: string;
  RegisterURL: string;
  ForgetPasswordURL: string;
}

export const AppConfig: IAppConfig = {
  apiEndpoint: 'http://localhost:5000/',
  apiSettingsPath: 'ApiSettings',
  BaseURL: 'https://apptamin.ir',
  ForgetPasswordURL: 'https://apptamin.ir/resetpassword',
  RegisterURL: 'https://apptamin.ir/register'
};
