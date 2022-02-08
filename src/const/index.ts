interface GetParams {
	readonly popup: string;
	readonly taskStatus: string;
}

export const GET_PARAMS: GetParams = {
	popup: "popup",
	taskStatus: "task-status",
};

interface Popups {
	readonly task: string;
}

export const POPUPS: Popups = {
	task: "task",
};
