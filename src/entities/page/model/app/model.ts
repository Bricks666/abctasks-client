import { createDomain } from 'effector';

const pageDomain = createDomain();

export const loaded = pageDomain.event();
