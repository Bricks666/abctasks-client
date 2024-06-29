import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
console.log(matchers);
expect.extend(matchers);

afterEach(() => {
	cleanup();
});
