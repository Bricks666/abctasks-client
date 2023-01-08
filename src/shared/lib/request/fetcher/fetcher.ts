import { api } from '@/shared/configs';
import { BaseFetcher, BaseFetcherOptions } from '../base';
import { StandardFailError } from '../error';
import { BaseRequestOptions, BodyRequestOptions } from './types';

export class Fetcher extends BaseFetcher<typeof fetch, BaseFetcherOptions> {
	constructor(options: BaseFetcherOptions) {
		super(options);
		super.instance = fetch.bind(globalThis);
	}

	override create(options: BaseFetcherOptions): Fetcher {
		const newURL = this.createPath({
			url: options.baseURL,
		});
		return new Fetcher({
			credentials: this.credentials,
			...options,
			baseURL: newURL,
		});
	}

	async get<R>(options: BaseRequestOptions): Promise<R> {
		const { path, accessToken, headers = {}, } = options;
		const url = this.createPath(path);
		try {
			const response = await this.instance(url, {
				method: 'GET',
				credentials: this.credentials ? 'include' : 'omit',
				mode: 'cors',
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.json();
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	async post<R, B = any>(options: BodyRequestOptions<B>): Promise<R> {
		const { path, accessToken, headers = {}, body, } = options;
		const url = this.createPath(path);
		try {
			const response = await this.instance(url, {
				method: 'POST',
				body: JSON.stringify(body),
				credentials: this.credentials ? 'include' : 'omit',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.json();
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	async put<R, B = any>(options: BodyRequestOptions<B>): Promise<R> {
		const { path, accessToken, headers = {}, body, } = options;
		const url = this.createPath(path);
		try {
			const response = await this.instance(url, {
				method: 'PUT',
				body: JSON.stringify(body),
				credentials: this.credentials ? 'include' : 'omit',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.json();
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	async delete<R>(options: BaseRequestOptions): Promise<R> {
		const { path, accessToken, headers = {}, } = options;
		const url = this.createPath(path);
		try {
			const response = await this.instance(url, {
				method: 'delete',
				credentials: this.credentials ? 'include' : 'omit',
				mode: 'cors',
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.json();
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	static #throwError(error: any): never {
		throw new StandardFailError(
			error.response.status!,
			error.response.statusText
		);
	}
}

export const fetcher = new Fetcher({
	baseURL: api,
	credentials: true,
});
