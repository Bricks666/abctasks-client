import { AccessOptions, Path } from '../types';

export interface BaseParamsOptions extends AccessOptions {
	readonly path: Path;
	readonly headers?: Headers;
}

export interface BodyParamsOptions<B> extends BaseParamsOptions {
	readonly body: B;
}
