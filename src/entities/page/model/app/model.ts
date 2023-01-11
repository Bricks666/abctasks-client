import { createDomain } from 'effector';

const pageDomain = createDomain();

export const started = pageDomain.event();
export const stopped = pageDomain.event();
