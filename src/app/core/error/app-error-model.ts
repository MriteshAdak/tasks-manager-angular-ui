export interface AppErrorModel {
    code: string;
    message: string;
    httpStatus: number;
    requestId: string;
    details?: Record<string, unknown>
}
