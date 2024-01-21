import { BrowserContext, test as base } from '@playwright/test';

export interface UserParams {
	readonly id?: number;
	readonly email?: string;
	readonly username?: string;
	readonly password?: string;
	readonly activated?: boolean;
}

export interface User {
	readonly id: number;
	readonly email: string;
	readonly username: string;
	readonly photo: null | string;
	readonly password: string;
	readonly activated: boolean;
}

export interface Tokens {
	readonly accessToken: string;
}

export interface Login {
	readonly tokens: Tokens;
	readonly user: User;
}

export interface TestingApiFixture {
	user(params?: UserParams): Promise<User>;
	removeUser(params?: UserParams): Promise<boolean>;
	login(params?: UserParams): Promise<Login>;
}

const buildUrl = (endpoint: string): string => {
	return `${process.env.API_HOST}/testing${endpoint}`;
};

const createRequest = <Func extends (ctx: BrowserContext, params: any) => any>(
	ctx: BrowserContext,
	func: Func
) => {
	return (params: Parameters<Func>[1]): ReturnType<Func> => {
		return func(ctx, params);
	};
};

const request = async <T>(
	ctx: BrowserContext,
	endpoint: string,
	init: Parameters<BrowserContext['request']['fetch']>[1] = {}
): Promise<T> => {
	const headers = { ...init.headers };

	const response = await fetch(buildUrl(endpoint), {
		...init,
		headers,
		mode: 'cors',
	});

	return response.json().then((data) => data.data);
};

const user = async (
	ctx: BrowserContext,
	data: UserParams = {}
): Promise<User> => {
	return request(ctx, '/user', {
		method: 'POST',
		data,
	});
};

const removeUser = async (
	ctx: BrowserContext,
	params: UserParams = {}
): Promise<boolean> => {
	return request(ctx, '/user', {
		method: 'DELETE',
		params,
	});
};

const login = async (
	ctx: BrowserContext,
	data: UserParams = {}
): Promise<Login> => {
	return request(ctx, '/login', {
		method: 'POST',
		data,
	});
};

const removeUser = async (params: UserParams = {}): Promise<User> => {
	const query = new URLSearchParams(params);

	return request('/user?' + query.toString(), {
		method: 'DELETE',
	});
};

export const test = base.extend<TestingApiFixture>({
	user: async ({ context }, use) => {
		await use(createRequest(context, user));
	},
	removeUser: async ({ context }, use) => {
		await use(createRequest(context, removeUser));
	},
	login: async ({ context }, use) => {
		await use(createRequest(context, login));
	},
});
