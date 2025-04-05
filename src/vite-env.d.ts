/// <reference types="vite/client" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom';

interface ImportMetaEnv {
	readonly VITE_API_HOST: string;
}

declare module 'vitest' {
	interface Assertion<T = any> extends TestingLibraryMatchers<T> {}
	interface AsymmetricMatchersContaining extends TestingLibraryMatchers {}
}
