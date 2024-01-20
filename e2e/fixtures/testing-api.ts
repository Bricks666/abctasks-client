import { test as base } from '@playwright/test';

export interface UserParams {
	readonly id?: number;
	readonly email?: string;
	readonly username?: string;
	readonly password?: string;
	readonly activated?: boolean;
	readonly photo?: null | string;
}

export interface User {
	readonly id: number;
	readonly email: string;
	readonly username: string;
	readonly photo: null | string;
	readonly password: string;
	readonly activated: boolean;
}

export interface TestingApiFixture {
	user(params?: UserParams): Promise<User>;
	removeUser(params?: UserParams): Promise<User>;
}

const buildUrl = (endpoint: string): string => {
	return `${process.env.API_HOST}/testing${endpoint}`;
};

const request = async <T>(endpoint: string, init: RequestInit): Promise<T> => {
	const headers = new Headers(init.headers);

	headers.set('Content-Type', 'application/json');

	const response = await fetch(buildUrl(endpoint), {
		...init,
		headers,
		mode: 'cors',
	});

	return response.json().then((data) => data.data);
};

const user = async (params: UserParams = {}): Promise<User> => {
	return request('/user', {
		method: 'POST',
		body: JSON.stringify(params),
	});
};

const removeUser = async (params: UserParams = {}): Promise<User> => {
	const query = new URLSearchParams(params);

	return request('/user?' + query.toString(), {
		method: 'DELETE',
	});
};

export const test = base.extend<TestingApiFixture>({
	user: async ({}, use) => {
		await use(user);
	},
	removeUser: async ({}, use) => {
		await use(removeUser);
	},
});
