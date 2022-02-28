import { ChangeProgressResponse } from "@/interfaces/response";
import { TaskProgressStructure } from "./types";
import { toValidTaskProgress } from "./utils";

export const changeProgressHandler = (
	state: TaskProgressStructure[],
	changes: ChangeProgressResponse[]
) => {
	const newState: TaskProgressStructure[] = [];
	const idsMap = Object.values(changes).reduce<
		Record<number, ChangeProgressResponse>
	>((acc, change) => ((acc[change.groupId] = change), acc), {});
	state.forEach((progress) => {
		const change = idsMap[progress.groupId];
		if (change) {
			const progress = change.progress;
			if (progress) {
				newState.push(toValidTaskProgress(progress));
			}
			delete idsMap[progress.groupId];
			return;
		}
		newState.push(progress);
	});

	const rest = Object.values(idsMap);
	if (rest.length) {
		rest.forEach((change) =>
			newState.push(toValidTaskProgress(change.progress))
		);
	}

	return newState;
};
