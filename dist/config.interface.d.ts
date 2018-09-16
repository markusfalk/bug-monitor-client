import { CustomField } from '../dist/custom-field.interface';
export interface Config {
    bugMonitorUrl: string;
    clientName: string;
    customFields?: CustomField | null;
    disabled?: boolean;
    httpMethod: string;
    timeout: number;
    verbose?: boolean;
}
//# sourceMappingURL=config.interface.d.ts.map