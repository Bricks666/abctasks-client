/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';

import { standardHandlers } from './handlres';

export const server = setupServer(...standardHandlers);
