import { VoidFunction } from '@/types/common';

export interface InstanceConfig {
	readonly baseURL: string;
	readonly withCredentials: boolean;
	readonly headers: Headers;
}
export type ConnectConfig = Omit<InstanceConfig, 'baseURL'>;

export type DataType = string | Uint8Array | Buffer;
export interface TimeoutError {
	readonly error: Error;
	readonly type: 'error';
}
export type Headers = Record<string, string>;

export interface CommonEvent {
	readonly type: string;

	readonly target: EventSource;
}

export interface ServicesEvent extends CommonEvent {
	readonly headers: object;
	readonly status: number;
	readonly statusText: string;
}

export interface OpenEvent extends ServicesEvent {
	readonly type: 'open';
}

export interface MessageEvent<T extends DataType> extends CommonEvent {
	readonly type: 'message';
	readonly data: T;
}

export interface ErrorEvent extends ServicesEvent {
	readonly type: 'error';
}

export type CloseConnect = VoidFunction;
export type Reconnect = () => Promise<CloseConnect>;
export type Handler<Evt> = (evt: Evt) => unknown;
export type ErrorHandlerParams = {
	event: ErrorEvent;
	reconnect: Reconnect;
};

export interface Handlers<T extends DataType> {
	readonly onerror?: Handler<ErrorHandlerParams>;
	readonly onmessage?: Handler<MessageEvent<T>>;
	readonly onopen?: Handler<OpenEvent>;
}

export type InterceptorHandler<T> = (params: T) => T | Promise<T>;

export interface Interceptor<T> {
	handler: InterceptorHandler<T> | null;
	use(handler: InterceptorHandler<T>): void;
}

export interface Interceptors<T extends DataType> {
	readonly beforeOpening: Interceptor<ConnectConfig>;
	readonly beforeOpen: Interceptor<OpenEvent>;
	readonly beforeError: Interceptor<ErrorHandlerParams>;
	readonly beforeMessage: Interceptor<MessageEvent<T>>;
}
