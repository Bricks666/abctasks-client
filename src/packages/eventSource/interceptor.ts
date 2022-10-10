import { Interceptor, InterceptorHandler } from './types';

export class InterceptorClass<T> implements Interceptor<T> {
	handler: InterceptorHandler<T> | null;

	constructor() {
		this.handler = null;
	}

	use(handler: InterceptorHandler<T>) {
		this.handler = handler;
	}
}
