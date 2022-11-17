import axios, { AxiosInstance } from 'axios';
import { api } from '@/const';
import { BaseFetcher, BaseFetcherOptions } from '../base';
import { BaseRequestOptions, BodyRequestOptions } from './types';
import { StandardFailError } from '../error';

export class Fetcher extends BaseFetcher<AxiosInstance, BaseFetcherOptions> {
	constructor(options: BaseFetcherOptions) {
		const { baseURL, credentials } = options;
		super(options);
		super.instance = axios.create({
			baseURL,
			withCredentials: credentials,
		});
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
		const { path, accessToken, headers = {} } = options;
		const url = this.createPath(path);
		try {
			const { data } = await this.instance.get(url, {
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return data;
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	async post<R, B = any>(options: BodyRequestOptions<B>): Promise<R> {
		const { path, accessToken, headers = {}, body } = options;
		const url = this.createPath(path);
		try {
			const { data } = await this.instance.post(url, body, {
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return data;
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	async put<R, B = any>(options: BodyRequestOptions<B>): Promise<R> {
		const { path, accessToken, headers = {}, body } = options;
		const url = this.createPath(path);
		try {
			const { data } = await this.instance.put(url, body, {
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return data;
		} catch (error) {
			Fetcher.#throwError(error);
		}
	}

	async delete<R>(options: BaseRequestOptions): Promise<R> {
		const { path, accessToken, headers = {} } = options;
		const url = this.createPath(path);
		try {
			const { data } = await this.instance.delete(url, {
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return data;
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
