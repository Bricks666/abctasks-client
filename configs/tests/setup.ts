import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mock-server';

expect.extend(matchers);

vi.mock('@/shared/configs/i18n/index.ts');

vi.mock('@farfetched/core', async (importOriginal) => {
	const module = await importOriginal<typeof import('@farfetched/core')>();

	return {
		...module,
		keepFresh: vi.fn(),
	};
});

afterEach(() => {
	cleanup();
});

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
