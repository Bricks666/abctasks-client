import { sample, Store } from 'effector';

export const mayStartFxHandler = (store: Store<boolean>) =>
	sample({ source: store, fn: (isLoading) => !isLoading });
