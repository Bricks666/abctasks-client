/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	EventSourcePolyfill as EventSource,
	Event,
	MessageEvent,
} from "event-source-polyfill";
interface Options {
	readonly baseURL?: string;
	readonly withCredentials?: boolean;
	readonly headers?: Record<string, string>;
}
type DataType = string | Uint8Array | Buffer;

interface CommonEvent {
	readonly status: number;
	readonly statusText: string;
}

interface ErrorEvent extends Readonly<Event>, CommonEvent {
	readonly type: "error";
}

interface DataEvent<T extends DataType>
	extends Readonly<MessageEvent>,
		CommonEvent {
	readonly data: T;
}

interface OpenEvent extends Readonly<Event>, CommonEvent {}

interface Handlers<T extends DataType> {
	readonly onerror?: (e: ErrorEvent) => void;
	readonly onmessage?: (e: DataEvent<T>) => void;
	readonly onopen?: (e: OpenEvent) => void;
}

export class SSEListener {
	private baseURL: string;
	private withCredentials: boolean;
	private headers: Record<string, string>;

	constructor(options: Options = {}) {
		this.baseURL = options.baseURL || "";
		this.withCredentials = options.withCredentials || false;
		this.headers = options.headers || {};
	}

	connect<T extends DataType>(
		url: string,
		handlers?: Handlers<T>,
		options?: Omit<Options, "baseURL">
	) {
		const fullPath =
			this.baseURL?.endsWith("/") || url.startsWith("/")
				? this.baseURL + url
				: this.baseURL + "/" + url;

		const connectOptions = {
			withCredentials: options?.withCredentials ?? this.withCredentials,
			headers: {
				...this.headers,
				...options?.headers,
			},
		};
		const ee = new EventSource(fullPath, connectOptions);

		ee.onopen = (handlers?.onopen as any) || null;
		ee.onmessage = (handlers?.onmessage as any) || null;
		ee.onerror = (handlers?.onerror as any) || null;

		return ee.close.bind(ee);
	}

	changeConfig(options: Options) {
		this.baseURL = options.baseURL ?? this.baseURL;
		this.headers = options.headers ?? this.headers;
		this.withCredentials = options.withCredentials ?? this.withCredentials;
	}
}
