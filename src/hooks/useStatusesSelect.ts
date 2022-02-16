import { useStatuses } from ".";

export const useStatusesSelect = () => {
	const statuses = useStatuses();

	return Object.entries(statuses).map(([_, status]) => ({
		label: status,
		value: status,
	}));
};
