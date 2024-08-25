import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { matchMedia, MediaQueryListEvent } from 'mock-match-media';
import { server, cleanup as cleanupMatchMedia } from '~/test-utils';

expect.extend(matchers);

vi.mock('@/shared/configs/i18n/index.ts');

vi.mock('@farfetched/core', async (importOriginal) => {
	const module = await importOriginal<typeof import('@farfetched/core')>();

	return {
		...module,
		keepFresh: vi.fn(),
	};
});

beforeAll(() => {
	server.listen();
});

afterEach(() => {
	cleanup();
	cleanupMatchMedia();
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

window.MediaQueryListEvent = MediaQueryListEvent;
window.matchMedia = (...args) => {
	console.log(args);
	return matchMedia(...args);
};
