export interface BugClientError {
  column?: number;
  errorObject?: Error;
  line?: number;
  message: string | Event;
  url?: string;
}
