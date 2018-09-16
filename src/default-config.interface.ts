import { UserConfig } from "./user-config.interface";

export interface DefaultConfig extends UserConfig {
  httpMethod: string;
  timeout: number;
}
