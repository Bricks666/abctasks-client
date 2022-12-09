import { Progress } from './types';

export interface ProgressChange {
	readonly groupId: number;
	readonly progress: any;
}

export const changeProgressHandler = (
	state: Progress[],
	changes: ProgressChange[]
) => {
	const newState: Progress[] = [];
	const idsMap = Object.values(changes).reduce<Record<number, ProgressChange>>(
		(acc, change) => {
			acc[change.groupId] = change;
			return acc;
		},
		{}
	);
	state.forEach((progress) => {
		const change = idsMap[progress.groupId];
		if (change) {
			const changedProgress = change.progress;
			if (changedProgress) {
				newState.push(changedProgress);
			}
			delete idsMap[progress.groupId];
			return;
		}
		newState.push(progress);
	});

	const rest = Object.values(idsMap);
	if (rest.length) {
		rest.forEach((change) => newState.push(change.progress));
	}

	return newState;
};
