import i18n from 'i18next';
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mock-server';

expect.extend(matchers);

i18n.init({
	lng: 'cimode',
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
