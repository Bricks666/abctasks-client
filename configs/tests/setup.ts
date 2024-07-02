import i18n from 'i18next';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

i18n.init({
	lng: 'cimode',
});

afterEach(() => {
	cleanup();
});
