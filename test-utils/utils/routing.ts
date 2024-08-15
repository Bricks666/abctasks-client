import { createHistoryRouter } from 'atomic-router';
import { MemoryHistoryOptions, createMemoryHistory } from 'history';
import { Scope, allSettled } from './state-manager';

export type HistoryRouter = ReturnType<typeof createHistoryRouter>;

export interface UseTestRouterParams {
	readonly router: HistoryRouter;
	readonly scope: Scope;
	readonly options?: MemoryHistoryOptions;
}

export const useTestRouter = async (params: UseTestRouterParams) => {
	const { scope, router, options } = params;

	await allSettled(router.setHistory, {
		scope,
		params: createMemoryHistory(options),
	});
};
