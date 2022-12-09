/* eslint-disable @typescript-eslint/no-unused-vars */
import { io, Socket } from 'socket.io-client';
import { api } from '@/shared/const';
import { BaseFetcher } from '../base';
import { ConnectionOptions, CallBack } from './types';

export class StreamFetcher extends BaseFetcher<Socket, object> {
	create(options: object) {
		return this;
	}

	connect(options: ConnectionOptions): void {
		const { onError, accessToken, } = options;
		const socket = io(this.baseURL, {
			auth: { token: accessToken, },
		});

		socket.once('connect_error', () => {
			onError(this.connect.bind(this));
		});

		socket.once('connection', () => {
			this.instance = socket;
		});
	}

	disconnect(): void {
		this.instance.disconnect();
	}

	on<R>(event: string, cb: CallBack<R>): void {
		this.instance.on(event, cb);
	}

	off<R>(event: string, cb: CallBack<R>): void {
		this.instance.off(event, cb);
	}

	emit<B extends Array<unknown>>(event: string, body?: B): void {
		this.instance.emit(event, body);
	}
}

export const streamFetcher = new StreamFetcher({
	baseURL: api,
	credentials: true,
});
