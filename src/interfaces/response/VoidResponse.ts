import { Record, Static } from 'runtypes';

export const voidResponse = Record({});
export type VoidResponse = Static<typeof voidResponse>;
