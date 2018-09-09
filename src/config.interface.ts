import { CustomField } from './custom-field.interface';
export interface Config {
  bugMonitorUrl: string;
  customFields?: CustomField[];
  disabled?: boolean;
  httpMethod: string;
  timeout: number;
  verbose?: boolean;
}
