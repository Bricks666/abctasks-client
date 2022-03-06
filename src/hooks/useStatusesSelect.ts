import { useStatuses } from ".";

export const useStatusesSelect = () => {
	const statuses = useStatuses();

	return Object.entries(statuses).map(([, status]) => ({
		label: status,
		value: status,
	}));
};
