import { api } from '@/shared/configs';
import { BaseFetcher, BaseFetcherOptions } from '../base';
import { StandardFailError } from '../error';
import { BaseParamsOptions, BodyParamsOptions } from './types';

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

	async get<R>(options: BaseParamsOptions): Promise<R> {
		const { path, accessToken, headers = {}, } = options;
		const url = this.createPath(path);

		const response = await this.instance(url, {
			method: 'GET',
			credentials: this.credentials ? 'include' : 'omit',
			mode: 'cors',
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new StandardFailError(response.status, response.statusText);
		}

		return response.json();
	}

	async post<R, B = any>(options: BodyParamsOptions<B>): Promise<R> {
		const { path, accessToken, headers = {}, body, } = options;
		const url = this.createPath(path);

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

		if (!response.ok) {
			throw new StandardFailError(response.status, response.statusText);
		}

		return response.json();
	}

	async put<R, B = any>(options: BodyParamsOptions<B>): Promise<R> {
		const { path, accessToken, headers = {}, body, } = options;
		const url = this.createPath(path);

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

		if (!response.ok) {
			throw new StandardFailError(response.status, response.statusText);
		}

		return response.json();
	}

	async delete<R>(options: BaseParamsOptions): Promise<R> {
		const { path, accessToken, headers = {}, } = options;
		const url = this.createPath(path);

		const response = await this.instance(url, {
			method: 'delete',
			credentials: this.credentials ? 'include' : 'omit',
			mode: 'cors',
			headers: {
				...headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			throw new StandardFailError(response.status, response.statusText);
		}

		return response.json();
	}
}

export const fetcher = new Fetcher({
	baseURL: api,
	credentials: true,
});
