import { Config } from './config.interface';
export declare class BugClient {
    bugMonitorClientConfigDefault: Config;
    constructor();
    private log;
    private sendErrorToBugMonitor;
    setErrorListener(): void;
    validateSetup(): boolean;
}
//# sourceMappingURL=bug-client.class.d.ts.map