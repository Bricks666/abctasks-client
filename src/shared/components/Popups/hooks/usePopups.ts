import { useUnit } from 'effector-react';
import { useEffect, useMemo, useState } from 'react';
import { $popups } from '@/models';

const parsePopups = (popups: string | null) => {
	return popups ? popups.split(',') : [];
};

let timeoutId: null | number = null;

export const usePopups = () => {
	const rawPopups = useUnit($popups);
	const [mountedPopups, setMountedPopups] = useState<string[]>(() =>
		parsePopups(rawPopups)
	);

	useEffect(() => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(
			() => setMountedPopups(parsePopups(rawPopups)),
			210
		) as unknown as number;
	}, [rawPopups]);

	const popups = useMemo(() => parsePopups(rawPopups), [rawPopups]);

	return { mountedPopups, popups, };
};
