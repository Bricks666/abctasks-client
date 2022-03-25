import { ID } from "@/interfaces/common";
import { ChangeProgressResponse } from "@/interfaces/response";
import { TaskProgressStructure } from "./types";
import { toValidTaskProgress } from "./utils";

export const changeProgressHandler = (
	state: TaskProgressStructure[],
	changes: ChangeProgressResponse[]
) => {
	const newState: TaskProgressStructure[] = [];
	const idsMap = Object.values(changes).reduce<
		Record<ID, ChangeProgressResponse>
	>((acc, change) => ((acc[change.groupId] = change), acc), {});
	state.forEach((progress) => {
		const change = idsMap[progress.groupId];
		if (change) {
			const changedProgress = change.progress;
			if (changedProgress) {
				newState.push(toValidTaskProgress(changedProgress));
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
