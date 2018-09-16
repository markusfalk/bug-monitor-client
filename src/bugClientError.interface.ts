export interface BugClientError {
  column?: number;
  errorObject?: Error;
  filename?: string;
  line?: number;
  message: string | Event;
}
