import {
	Event,
	EventSourcePolyfill as EventSource,
	MessageEvent as DataEvent,
} from "event-source-polyfill";
import { ErrorHandlerParams, InterceptorHandler, Reconnect } from ".";
import {
	ConnectConfig,
	DataType,
	Handler,
	Handlers,
	Headers,
	InstanceConfig,
	Interceptor,
	Interceptors,
	MessageEvent,
	OpenEvent,
	TimeoutError,
	ErrorEvent,
} from "./types";
import { prepareFullPath } from "./utils";

class InterceptorClass<T> implements Interceptor<T> {
	handler: InterceptorHandler<T> | null;

	constructor() {
		this.handler = null;
	}

	use(handler: InterceptorHandler<T>) {
		this.handler = handler;
	}
}

export class SSEListener {
	#baseURL: string;
	#withCredentials: boolean;
	#headers: Headers;
	readonly interceptors: Interceptors<DataType>;

	constructor(options: Partial<InstanceConfig> = {}) {
		this.#baseURL = options.baseURL || "";
		this.#withCredentials = options.withCredentials || false;
		this.#headers = options.headers || {};

		this.interceptors = {
			beforeError: new InterceptorClass(),
			beforeMessage: new InterceptorClass(),
			beforeOpen: new InterceptorClass(),
			beforeOpening: new InterceptorClass(),
		};
	}

	async connect<T extends DataType>(
		url: string,
		handlers: Handlers<T> = {},
		options: Partial<ConnectConfig> = {}
	) {
		const { onopen, onerror, onmessage } = handlers;
		const { headers = {}, withCredentials } = options;

		const fullPath = prepareFullPath(this.#baseURL, url);
		let connectOptions: ConnectConfig = {
			withCredentials: withCredentials ?? this.#withCredentials,
			headers: {
				...this.#headers,
				...headers,
			},
		};

		if (this.interceptors.beforeOpening?.handler) {
			connectOptions = await this.interceptors.beforeOpening.handler(
				connectOptions
			);
		}

		const ee = new EventSource(fullPath, connectOptions);

		ee.onopen = this.#onOpen(onopen);
		ee.onmessage = this.#onMessage(onmessage);
		ee.onerror = this.#onError(url, handlers, options, onerror);

		return ee.close.bind(ee);
	}

	changeConfig(options: Partial<InstanceConfig>) {
		const { baseURL, headers = {}, withCredentials } = options;
		this.#baseURL = baseURL ?? this.#baseURL;
		this.#headers = {
			...this.#headers,
			...headers,
		};
		this.#withCredentials = withCredentials ?? this.#withCredentials;
	}

	#onOpen(openHandler?: Handler<OpenEvent>) {
		return async (evt: Event) => {
			let event = evt as OpenEvent;
			if (this.interceptors.beforeOpen.handler) {
				event = await this.interceptors.beforeOpen.handler(event);
			}

			if (openHandler) {
				openHandler(event);
			}
		};
	}
	#onMessage<T extends DataType>(messageHandler?: Handler<MessageEvent<T>>) {
		return async (evt: DataEvent) => {
			let event = evt as unknown as MessageEvent<T>;
			if (this.interceptors.beforeMessage.handler) {
				event = (await this.interceptors.beforeMessage.handler(
					event
				)) as MessageEvent<T>;
			}

			if (messageHandler) {
				messageHandler(event);
			}
		};
	}
	#onError<T extends DataType>(
		url: string,
		handlers: Handlers<T>,
		options: Partial<ConnectConfig>,
		errorHandler?: Handler<ErrorHandlerParams>
	) {
		return async (evt: Event) => {
			let event: TimeoutError | ErrorEvent = evt as unknown as TimeoutError;
			if (event.error) {
				return;
			}
			event = evt as ErrorEvent;
			let reconnect: Reconnect = async () =>
				await this.connect(url, handlers, options);
			if (this.interceptors.beforeError.handler) {
				const intercepted = await this.interceptors.beforeError.handler({
					event,
					reconnect,
				});
				event = intercepted.event;
				reconnect = intercepted.reconnect;
			}

			if (errorHandler) {
				errorHandler({ event, reconnect });
			}
		};
	}
}
