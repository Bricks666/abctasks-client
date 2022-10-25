import { AccessOptions } from '../types';

export type CallBack<Arg> = (arg: Arg) => void;
export type Reconnect = CallBack<ConnectionOptions>;
export type OnError = CallBack<Reconnect>;

export interface ConnectionOptions extends AccessOptions {
	readonly onError: OnError;
}
