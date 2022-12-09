import { AccessOptions, Path } from '../types';

export interface BaseRequestOptions extends AccessOptions {
	readonly path: Path;
	readonly headers?: Headers;
}

export interface BodyRequestOptions<B> extends BaseRequestOptions {
	readonly body: B;
}
