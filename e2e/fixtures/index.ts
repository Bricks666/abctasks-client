import { mergeTests } from '@playwright/test';

import { test as testingApiTest } from './testing-api';

export const test = mergeTests(testingApiTest);

export type {
	User,
	Login,
	Room,
	Tokens,
	Tag,
	Task,
	Invitation,
	Member,
} from './testing-api';
