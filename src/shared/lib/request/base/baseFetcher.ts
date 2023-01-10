import { Path } from '../types';
import { normalizeQuery } from './lib';
import { BaseFetcherOptions } from './types';

export abstract class BaseFetcher<I, CO> {
	readonly #baseURL: string;

	readonly #credentials?: boolean;

	#instance: I | undefined;

	constructor(options: BaseFetcherOptions) {
		const { baseURL, credentials, } = options;

		this.#baseURL = baseURL;
		this.#credentials = credentials;
	}

	get credentials() {
		return this.#credentials;
	}

	get baseURL() {
		if (typeof this.#baseURL === 'undefined') {
			throw new Error('baseURL is undefined');
		}
		return this.#baseURL;
	}

	get instance() {
		if (typeof this.#instance === 'undefined') {
			throw new Error('baseURL is undefined');
		}
		return this.#instance;
	}

	set instance(i: I) {
		this.#instance = i;
	}

	abstract create(options: CO): BaseFetcher<I, CO>;

	createPath(path: Path): string {
		const { url, query = {}, } = path;
		const newURL: Array<string | number> =
			typeof url === 'string' || typeof url === 'number'
				? [this.baseURL, url]
				: [this.baseURL, ...url];
		const params = new URLSearchParams(normalizeQuery(query));
		const stringParams = params.toString();
		const search = stringParams ? `?${stringParams}` : '';
		return `${newURL.join('/')}${search}`;
	}
}
